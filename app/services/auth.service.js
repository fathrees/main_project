(function() {
    "use strict";

    angular.module("app")
        .factory("AuthService", AuthService);

    AuthService.$inject = ["$http", "$state", "$q"];

    function AuthService($http, $state, $q) {
        ;
        var authService = {
            login: login,
            isCollapsed:true
        };
        return authService;

        function login(credentials){
            console.log(credentials);
            var deffered =$q.defer();
            $http
                .post("http://dtapi.local/login/index", credentials)
                .then(function(res){
                  console.log(res.data.response);
                    if(res.data.response === "ok" && res.data.roles[1] === "admin") {
                        $state.go("admin")
                    }
                    if(res.data.response === "ok" && res.data.roles[1] === "student") {
                        $state.go("user");
                    }
                    if(res.data.response !== "ok"){
                         authService.isCollapsed = false;
                        console.log(authService.isCollapsed);
                        console.log(res)
                    }
                })
        };
    }

})();
