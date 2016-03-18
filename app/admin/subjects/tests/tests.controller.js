(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestsController", TestsController);

    TestsController.$inject = ["$stateParams", "testsService", "subjectsService", "REGEXP", "MESSAGE", "ENTITY_RANGE_ON_PAGE"];

    function TestsController($stateParams, testsService, subjectsService, REGEXP, MESSAGE, ENTITY_RANGE_ON_PAGE) {
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

        vm.list = [];
        vm.entitiesPerPage = ENTITY_RANGE_ON_PAGE;
        vm.maxSize = 3;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.getItemsPerPage = getItemsPerPage;
        vm.numPages = function () {
            return Math.ceil(vm.totalItems / $scope.numPerPage);
        };


        activate();



        function activate (){
            testsService.getTests($stateParams.subject_id).then(function(data){
                vm.totalList = data;
                getItemsPerPage();
                vm.totalItems = vm.totalList.length;
                if(vm.totalItems > ENTITY_RANGE_ON_PAGE) {
                    vm.showPagination = true;
                }else {
                    vm.showPagination = false
                }

            });
            subjectsService.getOneSubject($stateParams.subject_id).then(function(data){
                vm.currentSubject = data[0].subject_name;
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
                    alert(MESSAGE.SAVE_ERROR +  " " + data.response);
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

        function getItemsPerPage() {
            vm.currentRecordsRange = (vm.currentPage - 1) * vm.entitiesPerPage
            var end = vm.currentRecordsRange + vm.entitiesPerPage;
            vm.list = vm.totalList.slice(vm.currentRecordsRange, end);
        }
    }
})();