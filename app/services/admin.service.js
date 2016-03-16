(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "domain", "entities", "actions"];

    function adminService($http, $q, domain, entities, actions) {
        var service = {
            getAllCountRecords: getAllCountRecords
        };

        return service;

        function getAllCountRecords() {
            var defer = $q.defer();
            var urlCalls = {};
            angular.forEach(entities, function(entity) {
                urlCalls[entity] = $http.get(domain + entity + actions.COUNT_ENTITY);
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