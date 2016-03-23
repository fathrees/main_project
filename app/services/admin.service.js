(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "BASE_URL", "URLS", "ENTITIES_UKR"];

    function adminService($http, $q, BASE_URL, URLS, ENTITIES_UKR) {
        var service = {
            getAllCountRecords: getAllCountRecords
        };

        return service;

        function getAllCountRecords() {
            var defer = $q.defer();
            var urlCalls = {};
            angular.forEach(URLS.ENTITIES, function(entity) {
                if (ENTITIES_UKR.hasOwnProperty(entity.toUpperCase())) {
                    urlCalls[entity] = $http.get(BASE_URL + entity + URLS.COUNT_ENTITY);
                }
            });
            $q.all(urlCalls).then(function(response) {
                var statistics = [];
                angular.forEach(URLS.ENTITIES, function(entity) {
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
                defer.resolve(statistics);
            }, function(response) {
                defer.reject(response);
            });

            return defer.promise;
        }
    }

})();