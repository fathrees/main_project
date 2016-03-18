(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("SubjectsController", SubjectsController);

    SubjectsController.$inject = ["subjectsService", "ENTITY_RANGE_ON_PAGE", "MESSAGE"];

    function SubjectsController (subjectsService, ENTITY_RANGE_ON_PAGE, MESSAGE) {
        var vm = this;
        vm.headElements = subjectsService.getHeader();
        vm.formCollapsed = true;
        vm.hideForm = hideForm;
        vm.showForm = showForm;
        vm.allowSubmit = allowSubmit;
        vm.saveEntity = saveEntity;
        vm.removeSubject = removeSubject;
        vm.entitiesPerPage = ENTITY_RANGE_ON_PAGE;
        vm.maxSize = 3;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.pageChanged = pageChanged;
        activate();

        function activate() {
            subjectsService.totalItems().then(function (quantity) {
                vm.totalItems = +quantity;
                if(vm.totalItems > ENTITY_RANGE_ON_PAGE) {
                    vm.showPagination = true;
                }else {
                    vm.showPagination = false
                }
            });
            subjectsService.getSubjects(vm.currentRecordsRange).then(function (data) {
                vm.list = data;
            })}

        function hideForm() {
            vm.formCollapsed = true;
        }

        function allowSubmit (obj) {
            if (obj !== undefined) {

                return !(obj.attempts && obj.tasks && obj.test_name && obj.time_for_test);
            }else {

                return true;
            }
        }

        function saveEntity () {
            subjectsService.saveSubject(vm.subject).then(function (data) {
                if(data.response === "ok"){
                    alert(MESSAGE.SAVE_SUCCSES);

                } else{
                    alert(MESSAGE.SAVE_ERROR);
                };
                activate();
                vm.subject = {};
            })
        }

        function showForm(subject) {
            vm.formCollapsed = false;
            if (subject === undefined) {
                vm.subject = {}
            } else {
                vm.subject = subject;
            }
        }

        function removeSubject(subject) {
            if(confirm(MESSAGE.DEL_CONFIRM)){
                subjectsService.removeSubject(subject).then(function (res) {
                    if (res.response === "ok") {
                        alert(MESSAGE.DEL_SUCCESS)
                    } else if (res.response = "error 23000") {
                        alert(MESSAGE.DEL_ERROR);
                    }
                    activate();
                })
            }
        }

        function pageChanged () {
            vm.currentRecordsRange =(vm.currentPage - 1) * vm.entitiesPerPage;
            subjectsService.getSubjects(vm.currentRecordsRange).then(function (data) {
                vm.list = data;
            });
        }
    }
})();