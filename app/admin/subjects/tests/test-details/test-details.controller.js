(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestDetailsController", TestDetailsController);

    TestDetailsController.$inject = ["$stateParams", "testsService", "subjectsService", "REGEXP", "MESSAGE"];

    function TestDetailsController($stateParams, testsService, subjectsService, REGEXP, MESSAGE) {
        var vm = this;
        vm.headElements = testsService.getHeaderTestDetail();
        vm.removeTestLevel = removeTestLevel;
        vm.availableLevel;
        vm.isNotNumber = function(value){
            return isNaN(value)
        }
        
        activate();


        function activate(){
            testsService.getTestDetails($stateParams.test_id).then(function(data){
                console.log(data);
                vm.list = data;
                vm.availableLevel = testsService.getLevel (vm.list);
                console.log(vm.availableLevel);


            })
            testsService.getOneTest($stateParams.test_id).then(function(data){
                vm.currentTest = data[0];
            })
        }

        function removeTestLevel(testDetail) {
            if(confirm(MESSAGE.DEL_CONFIRM)) {
                testsService.removeTestLevel(testDetail.id).then(function (res) {
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