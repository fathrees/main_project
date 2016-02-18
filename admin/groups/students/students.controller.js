(function() {
    "use strict";

    angular.module("app.admin")
        .controller("StudentsController", StudentsController);

    StudentsController.$inject = [];

    function StudentsController() {
        var vm = this;
    }
})();