(function() {
    "use strict";

    angular.module("app")
        .factory("authService", authService);

    authService.$inject = ["$http", "$q"];

    function authService($http, $q) {
        var authUser;
        var service = {
            login: login
        };
        return service;

        function login(credentials){
            var defer = $q.defer()

            $http.post("http://dtapi.local/login/index", credentials)
                .then(function(res){
                    defer.resolve(res.data)
                },
                    function(err){
                    defer.reject(err);
                    })

            return defer.promise;
        }
    }
})();
