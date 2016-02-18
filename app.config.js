(function () {
    "use strict";

    angular.module("app")
        .config(configApp);

    function configApp($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("auth", {
                url: "/",
                templateUrl: "auth/auth.html",
                controller: "AuthController as auth"
            })
    }
})();

