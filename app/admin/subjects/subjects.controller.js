(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("SubjectsController", SubjectsController);

    SubjectsController.$inject = ["subjectsService", "APP_CONST", "$q"];

    function SubjectsController (subjectsService, APP_CONST, $q) {
        var vm = this;
        vm.newSubject = {};
        vm.editModel = {};
        vm.headElements = subjectsService.getHeader();
        vm.addFormCollapsed = true;
        vm.editFormCollapsed = true;
        vm.allowAddEdit = allowAddEdit;
        vm.showAddForm = showAddForm;
        vm.showEditForm = showEditForm;
        vm.addSubject = addSubject;
        vm.removeSubject = removeSubject;
        vm.editSubject = editSubject;
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.pageChanged = pageChanged;
        vm.promises = {
            totalItems: subjectsService.totalItems(),
            getSubjects: subjectsService.getSubjects(vm.currentRecordsRange)
        }
        activate(vm.promises);

        function activate(promises) {
            $q.all(promises).then(function (values){
                vm.totalItems = +values.totalItems;
                vm.list = values.getSubjects;
            })
        }

        function allowAddEdit (obj) {

            return !(obj.subject_name && obj.subject_description);
        }

        function showAddForm() {
            vm.addFormCollapsed = !vm.addFormCollapsed;
            vm.editFormCollapsed = true;
        }

        function showEditForm(index, subject) {
            vm.editFormCollapsed = false;
            vm.addFormCollapsed = true;
            vm.index = index;
            vm.editModel = {
                subject_name: subject.subject_name,
                subject_description: subject.subject_description
            };
        }

        function addSubject() {
            subjectsService.addSubject(vm.newSubject).then(function (data) {
                activate(vm.promises);
                vm.newSubject = {};
            })
        }

        function removeSubject(index) {
            vm.index = index;
            subjectsService.removeSubject(vm.list[vm.index].subject_id).then(function (res) {
                console.log(res)
                activate(vm.promises);
            })
        }

        function editSubject() {
            subjectsService.editSubject(vm.list[vm.index].subject_id, vm.editModel).then(function (config) {
                vm.list[vm.index].subject_name = config.subject_name;
                vm.list[vm.index].subject_description = config.subject_description;
            })
        }

        function getNextRange ()   {
            vm.currentRecordsRange =(vm.currentPage - 1) * APP_CONST.QUANTITY_ON_PAGE;
        }

        function pageChanged (){
            getNextRange ();
            subjectsService.getSubjects(vm.currentRecordsRange).then(function (data) {
                vm.list = data;
            });

        }
    }
})();