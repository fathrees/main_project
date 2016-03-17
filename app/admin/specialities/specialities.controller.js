(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService", "ENTITY_RANGE_ON_PAGE", "SPECIALITIES_CONST"];

    function SpecialitiesController (specialitiesService, ENTITY_RANGE_ON_PAGE, SPECIALITIES_CONST) {
        var vm = this;
        vm.showSaveForm = showSaveForm;
        vm.hideSaveForm = hideSaveForm;
        vm.saveFormCollapsed = true;
        vm.headElements = specialitiesService.getHeader();
        vm.saveSpeciality = saveSpeciality;
        vm.removeSpeciality = removeSpeciality;
        vm.felterGroups = filterGroups;
        vm.minNameLength = SPECIALITIES_CONST.MIN_NAME_LENGTH;
        vm.maxNameLength = SPECIALITIES_CONST.MAX_NAME_LENGTH;
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.pageChanged = pageChanged;
        activate();

        function activate() {
            specialitiesService.totalItems().then(function(quantity) {
                vm.totalItems = +quantity;
            });
            specialitiesService.getSpecialitiesRange(vm.currentRecordsRange).then(function(data) {
                vm.list = data;
            });
        }

        function showSaveForm(speciality) {
            vm.saveFormCollapsed = false;
            if (speciality === null) {
                vm.speciality = {};
            } else {
                vm.speciality = speciality;
            }
        }
        function hideSaveForm() {
            vm.saveFormCollapsed = true;
            vm.speciality = {};
        }

        function saveSpeciality() {
            specialitiesService.saveSpeciality(vm.speciality).then(function(res) {
                activate();
                vm.hideSaveForm();
            });
        }

        function removeSpeciality(speciality) {
            specialitiesService.removeSpeciality(speciality.speciality_id).then(function(res) {
                activate();
            });
        }

        function filterGroups(){

        }

        function getNextRange() {
            vm.currentRecordsRange =(vm.currentPage - 1) * ENTITY_RANGE_ON_PAGE;
        }

        function pageChanged(){
            getNextRange();
            specialitiesService.getSpecialities(vm.currentRecordsRange).then(function(data) {
                vm.list = data;
            });

        }
    }
})();