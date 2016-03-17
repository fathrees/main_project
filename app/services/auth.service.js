(function() {
    "use strict";

    angular.module("app")
        .factory("authService", authService);

    authService.$inject = ["$http", "$q", "BASE_URL", "AUTH"];

    function authService ($http, $q, BASE_URL, AUTH) {
        var service = {
            login: login,
            isLogged: isLogged,
            logout: logout
        };

        return service;

        function login (credentials){
            var defer = $q.defer();

            $http.post(BASE_URL + AUTH.LOGIN, credentials)
                .then(function (res){
                        defer.resolve (res.data);
                    },
                    function (res){
                        defer.reject (res);
                    });

            return defer.promise;
        }

        function isLogged(){
            var defer = $q.defer();

            $http.get (BASE_URL + AUTH.IS_LOGGED)
                .then(function (res){
                        if(res.data.response === "logged") {
                            defer.resolve(res.data);
                        }
                    },
                    function (res){
                        defer.reject(res);
                    });

            return defer.promise;
        }

        function logout(){
            var defer = $q.defer();

            $http.get(BASE_URL + AUTH.LOGOUT)
                .then(function (res){
                        defer.resolve(res);
                    },
                    function (res){
                        defer.reject(res);
                    });

            return defer.promise;
        }
    }
})();