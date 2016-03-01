(function() {
    "use strict";

    angular.module("app")
        .factory("authService", authService);

    authService.$inject = ["$http", "$q", "URL"];

    function authService ($http, $q, URL) {
        var service = {
            login: login,
            isLogged: isLogged,
            logout: logout
        };

        return service;

        function login (credentials){
            var defer = $q.defer();

            $http.post(URL.LOGIN, credentials)
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

            $http.get (URL.ISLOGGED)
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

            $http.get(URL.LOGOUT)
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
