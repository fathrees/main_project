(function () {
    "use strict";

    angular.module("app.admin")
        .controller("AddFacultyController", AddFacultyController);

    AddFacultyController.$inject = ["facultiesService"];

    function AddFacultyController(facultiesService) {
        var vm = this;
        vm.getOneFaculty = {
            id: null,
            name: "",
            description: ""
        };
        vm.saveFaculty = addFaculty;

        function addFaculty() {
            var faculty = {
                id: vm.getOneFaculty.id,
                name: vm.getOneFaculty.name,
                description: vm.getOneFaculty.description
            };
            facultiesService.addFaculty(faculty);
        }
    }
})();