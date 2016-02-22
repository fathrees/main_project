(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("SubjectsService", SubjectsService);

    SubjectsService.$inject = [];

    function SubjectsService() {
        var subjectsService = {

        };

        return subjectsService;
    }

})();