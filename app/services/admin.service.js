(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "BASE_URL", "URL"];

    function adminService($http, $q, BASE_URL, URL) {
        var service = {
            getHeader: getHeader,
            getAdmins: getAdmins,
            getAllCountRecords: getAllCountRecords
        };

        return service;
        function getAdmins() {
            var deferred = $q.defer();
            $http.get(BASE_URL + URL.ENTITIES.ADMIN + URL.GET_ENTITIES)
                .then(function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function getHeader() {

            return ["Логін", "E-mail", "Відвідування", "Дії"];
        }

        function getAllCountRecords() {
            var deferred = $q.defer();
            var urlCalls = {};
            angular.forEach(URL.ENTITIES, function(entity) {
                if ((entity != "test_detail") && (entity != "question") && (entity != "answer") && (entity != "result")
                    && (entity != "AdminUser")) {
                    urlCalls[entity] = $http.get(BASE_URL + entity + URL.COUNT_ENTITY);
                }
            });
            $q.all(urlCalls).then(function(response) {
                deferred.resolve(response);
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

})();