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

        function getTests (subjectId) {
            var deferred = $q.defer();
            $http.get(URL.GET_TESTS)
                .then(function (res){

                        if(Array.isArray(res.data)) {
                            var result = res.data.filter(function(obj){
                                console.log("subjectId "+subjectId);
                                return +(obj.subject_id) === subjectId;
                            })
                            deferred.resolve(result);
                        }else {
                            deferred.resolve(res)
                        }
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

// use for filter obj in response by ID.


})();