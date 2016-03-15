(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestsController", TestsController);

    TestsController.$inject = ["$stateParams", "testsService"];

    function TestsController($stateParams, testsService) {
        var vm = this;
        vm.headElements = testsService.getHeader();
        vm.addFormCollapsed = true;
        vm.editFormCollapsed = true;
        vm.showAddForm = showAddForm;
        vm.showEditForm = showEditForm;
        vm.allowAddEdit = allowAddEdit;
        vm.addTest = addTest;
        vm.currentTest = {};
        vm.editTest = editTest;
        vm.removeTest = removeTest;
        vm.newTest = {
            subject_id: $stateParams.subject_id
        }
        activate();

        function activate (){
            testsService.getTests($stateParams.subject_id).then(function(data){
                vm.list = data;
                console.log(vm.list);
            });
        }

        function showAddForm() {
            vm.addFormCollapsed = !vm.addFormCollapsed;
            vm.editFormCollapsed = true;
        }

        function showEditForm(index, test) {
            vm.editFormCollapsed = false;
            vm.addFormCollapsed = true;
            vm.index = index;
            vm.currentTest = {
                test_name: test.test_name,
                tasks: +(test.tasks),
                time_for_test: +(test.time_for_test),
                subject_id: $stateParams.subject_id,
                enabled: +(test.enabled),
                attempts: +(test.attempts)
            };
        }

        function allowAddEdit (obj) {

            return !(obj.attempts && obj.tasks && obj.test_name && obj.time_for_test && obj.enabled);
        }

        function addTest () {
            testsService.addTest(vm.newTest).then(function (data) {
                if(data.response === "ok"){
                    vm.list.push(vm.newTest);
                } else{
                    console.log("Помилка. Тест не додано");
                };
                vm.newTest = {
                    subject_id: $stateParams.subject_id
                };
            })
        }

        function removeTest(index) {
            testsService.removeTest(vm.list[index].test_id).then(function (res) {
                if (res.response = "ok") {
                    console.log("Тест успішно видалено)"
                }else if(res.response = "error 23000"){
                    console.log("Тест не видалено. необхідно видалити запитання в тесті)"
                }
               );
                activate();
            })
        }

        function editTest() {
            testsService.editTest(vm.list[vm.index].test_id, vm.currentTest).then(function (data) {
                if(data.response === "ok"){
                    vm.list[vm.index].test_name = vm.currentTest.test_name;
                    vm.list[vm.index].tasks = vm.currentTest.tasks;
                    vm.list[vm.index].time_for_test = vm.currentTest.time_for_test;
                    vm.list[vm.index].enabled = vm.currentTest.enabled;
                    vm.list[vm.index].attempts = vm.currentTest.attempts;
                    vm.editFormCollapsed = true;
                } else{
                    console.log("Помилка. Зміни не збережені");
                };
            })
        }

    }
})();