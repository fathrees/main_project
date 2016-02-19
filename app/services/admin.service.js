(function() {
    "use strict";

    angular.module("app.admin")
        .factory("AdminService", AdminService);

    AdminService.$inject = [];

    function AdminService() {
        var adminService = {

        };

        return adminService;
    }

})();