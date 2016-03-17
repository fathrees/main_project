(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "BASE_URL", "ENTITIES", "ACTIONS"];

    function adminService($http, $q, BASE_URL, ENTITIES, ACTIONS) {
        var service = {
            getAllCountRecords: getAllCountRecords
        };

        return service;

        function getAllCountRecords() {
            var defer = $q.defer();
            var urlCalls = {};
            angular.forEach(ENTITIES, function(entity) {
                if ((entity != "test_detail") && (entity != "question") && (entity != "answer") && (entity != "result")) {
                    console.log(entity);
                    urlCalls[entity] = $http.get(BASE_URL + entity + ACTIONS.COUNT_ENTITY);
                }
            });
            $q.all(urlCalls).then(function(response) {
                defer.resolve(response);
            }, function(response) {
                defer.reject(response);
            });

            return defer.promise;
        }
    }

})();