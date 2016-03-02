(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService"];

    function SpecialitiesController(specialitiesService) {
        var vm = this;
        vm.specialitiesList = [];
        vm.deleteSpeciality = deleteSpeciality;
        vm.search = "";
        activate();

        function activate() {
            return specialitiesService.getSpecialities().then(function(response){
                vm.specialitiesList = response.data.specialities;

                return vm.specialitiesList;
            })
        }

        function deleteSpeciality(id) {
            specialitiesService.deleteSpeciality(id);
        }
    }
})();