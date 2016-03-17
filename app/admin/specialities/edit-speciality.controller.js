(function() {
    "use strict";

    angular.module("app.admin")
        .controller("EditSpecialityController", EditSpecialityController);

    EditSpecialityController.$inject = ["$stateParams", "specialitiesService"];

    function EditSpecialityController($stateParams, specialitiesService) {
        var vm = this;
        activate();

        function  activate() {
            return specialitiesService.getOneSpeciality($stateParams.speciality_id).then(function(response){
                vm.getOneSpeciality = response;

                return vm.getOneSpeciality;
            });
        }
    }
})();