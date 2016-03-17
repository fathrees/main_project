(function () {
    "use strict";

    angular.module("app.admin")
        .controller("AddSpecialityController", AddSpecialityController);

    AddSpecialityController.$inject = ["specialitiesService"];

    function AddSpecialityController(specialitiesService) {
        var vm = this;
        vm.getOneSpeciality = {
            id: null,
            name: "",
            code: ""
        };
        vm.saveSpeciality = addSpeciality;

        function addSpeciality() {
            var speciality = {
                id: vm.getOneSpeciality.id,
                name: vm.getOneSpeciality.name,
                code: vm.getOneSpeciality.code
            };
            specialitiesService.addSpeciality(speciality);
        }
    }
})();