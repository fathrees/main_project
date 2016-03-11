(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("SubjectsController", SubjectsController);

    SubjectsController.$inject = ["subjectsService"];

    function SubjectsController (subjectsService) {
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
        activate();

        function activate() {
            return subjectsService.getSubjects().then(function (data) {
                vm.list = data;
            });

            return vm.list;
        }

        function allowAddEdit (obj) {
            return !(obj.subject_name && obj.subject_description)
        }

        function showAddForm() {
            vm.addFormCollapsed = !vm.addFormCollapsed;
            vm.editFormCollapsed = true;
        }

        function showEditForm(index, subject) {
            vm.editFormCollapsed = false;
            vm.addFormCollapsed = true;
            vm.index = index;
            console.log(vm.index);
            console.log(subject);
            vm.editModel = {
                subject_name: subject.subject_name,
                subject_description: subject.subject_description
            };
        }

        function addSubject() {
            subjectsService.addSubject(vm.newSubject).then(function (data) {
                activate();
                vm.newSubject = {};
            })
        }

        function removeSubject(index) {
            vm.index = index
            console.log(vm.list[vm.index].subject_id);
            subjectsService.removeSubject(vm.list[vm.index].subject_id).then(function (res) {
                console.log(res);
                activate();
            })
        }

        function editSubject() {
            subjectsService.editSubject(vm.list[vm.index].subject_id, vm.editModel).then(function (res) {
                console.log(res)
                activate();
            })

        }
    }
})();