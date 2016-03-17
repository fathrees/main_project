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
        vm.allowAddEdit = allowAddEdit;
        vm.saveEntity = saveEntity;
        vm.removeSubject = removeSubject;
        vm.entitiesPerPage = ENTITY_RANGE_ON_PAGE;
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.pageChanged = pageChanged;
        activate();

        function activate() {
            subjectsService.totalItems().then(function (quantity) {
                vm.totalItems = +quantity;
            });
            subjectsService.getSubjects(vm.currentRecordsRange).then(function (data) {
                vm.list = data;
            });
        }

        function hideForm() {
            vm.formCollapsed = true;
        }

        function allowAddEdit (obj) {
            if (obj !== undefined) {

                return !(obj.attempts && obj.tasks && obj.test_name && obj.time_for_test);
            }else {

                return true;
            }
        }

        function saveEntity () {
            subjectsService.saveSubject(vm.subject).then(function (data) {
                console.log(data);
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
            subjectsService.removeSubject(subject).then(function (res) {
                activate();
            })
        }

        function editSubject() {
            subjectsService.editSubject(vm.list[vm.index].subject_id, vm.editModel).then(function (config) {
                vm.list[vm.index].subject_name = config.subject_name;
                vm.list[vm.index].subject_description = config.subject_description;
            })
        }

        function getNextRange ()   {
            vm.currentRecordsRange =(vm.currentPage - 1) * vm.entitiesPerPage;
        }

        function pageChanged (){
            getNextRange ();
            subjectsService.getSubjects(vm.currentRecordsRange).then(function (data) {
                vm.list = data;
            });
        }
    }
})();