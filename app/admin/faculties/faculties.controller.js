(function() {
    "use strict";

    angular.module("app.admin")
        .controller("FacultiesController", FacultiesController);

    FacultiesController.$inject = ["facultiesService"];

    function FacultiesController(facultiesService) {
        var vm = this;
        vm.facultiesList = [];
        vm.deleteFaculty = deleteFaculty;
        vm.search = "";
        activate();

        function activate() {
            return facultiesService.getFaculties().then(function(response){
                vm.facultiesList = response.data.faculties;

                return vm.facultiesList;
            })
        }

        function deleteFaculty(id) {
            facultiesService.deleteFaculty(id);
        }
    }
})();
