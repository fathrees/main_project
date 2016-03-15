(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("testsService", testsService);

    testsService.$inject = ["$http", "$q", "URL"];

    function testsService($http, $q, URL) {
        var service = {
            getTests: getTests,
            addTest: addTest,
            editTest: editTest,
            removeTest: removeTest,
            getHeader: getHeader
        };

        return service;

        function getTests (subjectId) {
            var deferred = $q.defer();
            $http.get(URL.GET_TESTS)
                .then(function (res){

                        if(Array.isArray(res.data)) {
                            var filteredData = res.data.filter(function(obj){

                                return +(obj.subject_id) === subjectId;
                            })
                            deferred.resolve(filteredData);
                        }else {
                            deferred.resolve(res)
                        }
                    },
                    function(res){
                        deferred.reject (res);
                    });

            return deferred.promise;
        }

        function addTest (newTest){
            return $http.post(URL.ADD_TEST, newTest)
                .then(function (res) {

                        return res.data;
                    },
                    function(res){
                        console.log(res);
                    });
        }

        function editTest (id, editedObject) {
            return $http.post(URL.EDIT_TEST + id, editedObject)
                .then(function(res){

                        return res.data;
                    },
                    function (res) {
                        console.log(res);
                    });
        }

        function removeTest (id) {
            return $http.get(URL.REMOVE_TEST + id)
                .then(function(res){
                        return res.data;
                    },
                    function (res) {
                        console.log(res);
                    });
        }

        function getHeader() {
            return ["Назва тесту", "Завдань", "Тривалість, хв", "Статус"];
        }
    }
})();