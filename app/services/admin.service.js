(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "BASE_URL", "URL", "ENTITIES_UKR"];

    function adminService($http, $q, BASE_URL, URL, ENTITIES_UKR) {
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
                if (ENTITIES_UKR.hasOwnProperty(entity.toUpperCase())) {
                    urlCalls[entity] = $http.get(BASE_URL + entity + URL.COUNT_ENTITY);
                }
            });
            $q.all(urlCalls).then(function(response) {
                var statistics = [];
                angular.forEach(URL.ENTITIES, function(entity) {
                    if (ENTITIES_UKR.hasOwnProperty(entity.toUpperCase())) {
                        var entityUKR;
                        var upperEntity = entity.toUpperCase();
                        if (ENTITIES_UKR.hasOwnProperty(upperEntity)) {
                            entityUKR = ENTITIES_UKR[upperEntity];
                        }
                        var tempObj = {title: entityUKR, count: response[entity].data.numberOfRecords};
                        statistics.push(tempObj);
                    }
                });
                deferred.resolve(statistics);
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

})();