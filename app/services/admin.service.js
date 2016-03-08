(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "urls"];

    function adminService($http, $q, urls) {
        var service = {
            getAllCountRecords: getAllCountRecords
        };

        return service;

        function getAllCountRecords() {
            var defer = $q.defer();
            var urlCalls = {};
            angular.forEach(urls, function(url) {
                urlCalls[url.ENTITYNAME] = $http.get(url.URL);
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