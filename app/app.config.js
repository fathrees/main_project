(function () {
    "use strict";

    angular.module("app")
        .config(ConfigApp);

    ConfigApp.$inject = ["$stateProvider", "$urlRouterProvider"];

    function ConfigApp($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("auth", {
                url: "/",
                templateUrl: "app/auth/auth.html",
                controller: "AuthController as auth"
            })
    }
})();

