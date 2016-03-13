(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService", "APP_CONST"];

    function SpecialitiesController (specialitiesService, APP_CONST) {
        var vm = this;
        vm.newSpeciality = {};
        vm.editModel = {};
        vm.headElements = specialitiesService.getHeader();
        vm.addFormCollapsed = true;
        vm.editFormCollapsed = true;
        vm.allowAddEdit = allowAddEdit;
        vm.minInputLength = APP_CONST.MIN_INPUT_LENGTH;
        vm.maxNameLength = APP_CONST.MAX_NAME_LENGTH;
        vm.maxCodeLength = APP_CONST.MAX_CODE_LENGTH;
        vm.showAddForm = showAddForm;
        vm.showEditForm = showEditForm;
        vm.addSpeciality = addSpeciality;
        vm.removeSpeciality = removeSpeciality;
        vm.editSpeciality = editSpeciality;
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.pageChanged = pageChanged;
        activate();

        function activate() {
            specialitiesService.totalItems().then(function (quantity) {
                vm.totalItems = +quantity;
            });
            specialitiesService.getSpecialities(vm.currentRecordsRange).then(function (data) {
                vm.list = data;
            });
        }

        function allowAddEdit(obj) {
            var message = "";
            if (!(obj.speciality_name && (obj.speciality_name.length <= vm.maxNameLength)) && (obj.speciality_code && (obj.speciality_code.length <= vm.maxCodeLength))) {
                message = "Заповніть всі поля!";
            };

            return message;
        }

        function showAddForm() {
            vm.addFormCollapsed = !vm.addFormCollapsed;
            vm.editFormCollapsed = true;
        }

        function showEditForm(index, speciality) {
            vm.editFormCollapsed = false;
            vm.addFormCollapsed = true;
            vm.index = index;
            vm.editModel = {
                speciality_name: speciality.speciality_name,
                speciality_code: speciality.speciality_code
            };
        }

        function addSpeciality() {
            specialitiesService.addSpeciality(vm.newSpeciality).then(function(data) {
                activate();
                vm.newSpeciality = {};
            })
        }

        function removeSpeciality(index) {
            vm.index = index
            specialitiesService.removeSpeciality(vm.list[vm.index].speciality_id).then(function(res) {
                activate();
            })
        }

        function editSpeciality() {
            specialitiesService.editSpeciality(vm.list[vm.index].speciality_id, vm.editModel).then(function(res) {
                activate();
            })
        }

        function getNextRange() {
            vm.currentRecordsRange =(vm.currentPage - 1) * APP_CONST.QUANTITY_ON_PAGE;
        }

        function pageChanged(){
            getNextRange();
            specialitiesService.getSpecialities(vm.currentRecordsRange).then(function(data) {
                vm.list = data;
            });

        }
    }
})();