(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminsController", AdminsController);

    AdminsController.$inject = [];

    function AdminsController() {
        var vm = this;
    }
})();