(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("testsService", testsService);

    testsService.$inject = ["$http", "$q", "URL"];

    function testsService($http, $q, URL) {
        var service = {
            getTests: getTests,
            getHeader: getHeader
        };

        return service;

         function getTests () {
             console.log("getTests");
             var deferred = $q.defer();
             $http.get(URL.GET_TESTS)
                 .then(function (res){
                    deferred.resolve(res.data);
                 },
                 function(res){
                     deferred.reject (res);
                 });

             return deferred.promise;
         }

        function getHeader() {
            return ["Назва тесту", "Завдань", "Тривалість", "Статус"];
        }
    }
})();