(function() {
    "use strict";

    angular.module("app.admin")
        .controller("EditFacultyController", EditFacultyController);

    EditFacultyController.$inject = ["$stateParams", "facultiesService"];

    function EditFacultyController($stateParams, facultiesService) {
        var vm = this;
        activate();

        function  activate() {
            return facultiesService.getOneFaculty($stateParams.faculty_Id).then(function(response){
                vm.getOneFaculty = response;

                return vm.getOneFaculty;
            });
        }
    }
})();