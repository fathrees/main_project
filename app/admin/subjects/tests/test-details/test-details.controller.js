(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestDetailsController", TestDetailsController);

    TestDetailsController.$inject = ["$stateParams", "testsService", "subjectsService", "REGEXP", "MESSAGE"];

    function TestDetailsController($stateParams, testsService, subjectsService, REGEXP, MESSAGE) {
        var vm = this;
        var usedLevel = [];
        vm.availableLevel = [];

        vm.headElements = testsService.getHeaderTestDetail();
        vm.removeTestLevel = removeTestLevel;
        vm.formCollapsed = true;
        vm.hideForm = hideForm;
        vm.showForm = showForm;
        vm.saveEntity = saveEntity;
       // vm.summaryRate = 0;
        vm.availableTask = 0;
        vm.onlyNumber = REGEXP.ONLY_NUMBER;
        vm.isFormInvalid = isFormInvalid;


        vm.isNotNumber = function(value){
            return isNaN(value)
        }

        activate();




        function activate(){
            testsService.getOneTest($stateParams.test_id).then(function(data){
                vm.currentTest = data[0];
            })

            testsService.getTestLevel($stateParams.test_id).then(function(data){
                vm.list = data;
                console.log(vm.list);
                vm.summaryRate = 0;
                vm.list.forEach(function(item){
                    vm.summaryRate += (parseInt(item.tasks) * parseInt(item.rate));
                })
                vm.taskIsUsed = taskIsUsed();
            })
        }

        function hideForm() {
            vm.formCollapsed = true;
        }


        /**
         * Set ava wich available Level. If it's edit,  pushed level of edited object to array.
         * Count and set how much tasks are aviable. If it's edit,  added tasks of edited object to array.
         * Switch editing and adding.*/

        function showForm(testLevel) {

            vm.availableLevel = testsService.getLevel (vm.list);
            vm.availableTask =  testsService.availableTasks (vm.list, vm.currentTest.tasks);
            console.log(vm.availableTask);
            vm.formCollapsed = false;
            if (testLevel === undefined) {
                vm.testLevel = {
                    test_id: $stateParams.test_id
                }
            }else{
                vm.availableLevel.push(testLevel.level);
                vm.availableTask += parseInt(testLevel.tasks)
                vm.testLevel = testLevel;
            }
        }


        function saveEntity () {
            testsService.saveTestLevel(vm.testLevel).then(function (data) {
                if(data.response === "ok"){
                    alert(MESSAGE.SAVE_SUCCSES);

                } else{
                    alert(MESSAGE.SAVE_ERROR +  " " + data.response);
                };
                activate();
                vm.testLevel = {};
                hideForm();
            })
        }

        function removeTestLevel(testLevel) {
            if(confirm(MESSAGE.DEL_CONFIRM)) {
                testsService.removeTestLevel(testLevel.id).then(function (res) {
                    if (res.response === "ok") {
                        alert(MESSAGE.DEL_SUCCESS)
                    } else if (res.response === "error 23000") {
                        alert(MESSAGE.DEL_ERROR);
                    }
                    activate();
                })
            }
        }

         /**
          * Set add button disabled.
          * @return {boolean} When all tasks or levels were used add button is disabled and show message*/

        function taskIsUsed (){
            return !vm.availableTask || !vm.availableLevel.length;
        }

        function summaryRate (item) {
            arrTestDetail.forEach(function(item){
                countOfUsedTasks += parseInt(item.tasks);
            })
        }

        function isFormInvalid () {
            vm.invalidform = (vm.testLevel.tasks > vm.availableTask);
            console.log((vm.testLevel.tasks > vm.availableTask));
        }
    }
})();