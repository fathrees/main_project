(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestsController", TestsController);

    TestsController.$inject = ["$stateParams", "testsService", "subjectsService", "REGEXP", "MESSAGE"];

    function TestsController($stateParams, testsService, subjectsService, REGEXP, MESSAGE) {
        var vm = this;
        vm.headElements = testsService.getHeader();
        vm.status = testsService.getStatus();
        vm.formCollapsed = true;
        vm.hideForm = hideForm;
        vm.showForm = showForm;
        vm.allowSubmit = allowSubmit;
        vm.saveEntity = saveEntity;
        vm.removeTest = removeTest;
        vm.onlyNumber = REGEXP.ONLY_NUMBER;
;

        activate();

        function activate (){
            testsService.getTests($stateParams.subject_id).then(function(data){
                vm.list = data;
                console.log(data);
            });
            subjectsService.getOneSubject($stateParams.subject_id).then(function(data){
                vm.currentSubject = data[0].subject_name;
;
            })
        }

        function hideForm() {
            vm.formCollapsed = true;
        }

        function showForm(test) {
            vm.formCollapsed = false;
            if (test === undefined) {
                vm.test = {
                    subject_id: $stateParams.subject_id
                }
            }else{
                vm.test = test;
            }
        }

        function allowSubmit (obj) {
            if (obj !== undefined) {

                return !(obj.attempts && obj.tasks && obj.test_name && obj.time_for_test);
            }else {

                return true;
            }

        }

        function saveEntity () {
            testsService.saveTest(vm.test).then(function (data) {
                if(data.response === "ok"){
                    alert(MESSAGE.SAVE_SUCCSES);

                } else{
                    alert(MESSAGE.SAVE_ERROR);
                };
                activate();
                vm.test = {};
            })
        }

        function removeTest(test) {
            if(confirm(MESSAGE.DEL_CONFIRM)) {
                testsService.removeTest(test.test_id).then(function (res) {
                    if (res.response === "ok") {
                        alert(MESSAGE.DEL_SUCCESS)
                    } else if (res.response = "error 23000") {
                        alert(MESSAGE.DEL_ERROR);
                    }
                    activate();
                })
            }
        }
    }
})();