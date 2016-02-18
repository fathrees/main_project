(function() {
    "use strict";

    angular.module("app")
        .factory("AuthService", AuthService);

    AuthService.$inject = [];

    function AuthService() {
        var authService = {

        };

        return authService;
    }

})();