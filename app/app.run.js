(function () {
    "use strict";

    angular.module("app")
        .run(runApp);

    runApp.$inject = ["$rootScope", "$state", "authService"];

    function runApp ($rootScope, $state, authService){
        $rootScope.$on("$stateChangeStart", function (e, toState, toStateParams){
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            authService.isLogged().then(function(res){
                console.log("toState.data  " + toState.data);
                console.log("res.roles[1]  " + res);
                console.log("event  " + e);

                if((toState.data !== undefined ) && (res.roles[1] !== toState.data.role)) {
                    console.log(toState.data);
                    e.preventDefault();
                    $state.go("auth");
                }
            })
        });
    }
})();

