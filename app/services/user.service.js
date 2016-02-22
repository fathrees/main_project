(function() {
    "use strict";

    angular.module("app.user")
        .factory("UserService", UserService);

    UserService.$inject = [];

    function UserService() {
        var userService = {

        };

        return userService;
    }

})();