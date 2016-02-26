(function() {
    "use strict";

    angular.module("app")
        .factory("authService", authService);

    authService.$inject = ["$http", "$q"];

    function authService($http, $q) {
        var service = {
            login: login,
            isLogged: isLogged,
            logout:logout
        };
        return service;

        function login(credentials){
            var defer = $q.defer();

            $http.post("http://dtapi.local/login/index", credentials)
                .then(function(res){
                        defer.resolve(res.data)
                    },
                    function(err){
                        defer.reject(err);
                    });

            return defer.promise;
        }

        function isLogged(){
            var defer = $q.defer();

            $http.get("http://dtapi.local/login/isLogged")
                .then(function(res){
                        if(res.response === "logged")
                            defer.resolve(res.data)
                    },
                    function(err){
                        defer.reject(err);
                    });

            return defer.promise;
        }

        function logout(){
            var defer = $q.defer();

            $http.get("http://dtapi.local/login/logout")
                .then(function(res){
                            defer.resolve(res)
                    },
                    function(err){
                        defer.reject(err);
                    });

            return defer.promise;
        }
    }
})();
