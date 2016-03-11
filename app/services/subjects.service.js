(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("subjectsService", subjectsService);

    subjectsService.$inject = ["$http", "$q", "URL", "APP_CONST"];

    function subjectsService($http, $q, URL, APP_CONST) {
        var service = {
            getSubjects: getSubjects,
            totalItems: totalItems,
            addSubject: addSubject,
            editSubject: editSubject,
            removeSubject: removeSubject,
            getHeader: getHeader
        };

        return service;

        function getSubjects(currentRecordsRange){
            var deferred = $q.defer();
            $http.get(URL.GET_SUBJECT_RANGE + APP_CONST.QUANTITY_ON_PAGE+ "/" + currentRecordsRange)
                .then(function (res){
                    deferred.resolve (res.data);
                },
                function(res){
                    deferred.reject (res);
                });

            return deferred.promise;
        }

        function totalItems(){
            var deferred = $q.defer();
            $http.get(URL.COUNT_SUBJECTS)
                .then(function (res){
                    if(res.status === 200) {
deferred.resolve(res.data.numberOfRecords)
                    }
                },
                function(res){
                    deferred.reject (res);
                });

            return deferred.promise;
        }

        function addSubject(newSubject){
            var deferred = $q.defer();
            $http.post(URL.ADD_SUBJECT, newSubject)
                .then(function (res) {
                    deferred.resolve(res.data);
                },
                function(res){
                    deferred.reject(res);
                });

            return deferred.promise;
        }

        function editSubject(id, editModel){
            var deferred = $q.defer();
            $http.post(URL.EDIT_SUBJECT + id, editModel)
                .then(function(res){
                    deferred.resolve(res);
                },
                function (res) {
                    deferred.reject(res);
                });

            return deferred.promise;
        }

        function removeSubject(id) {
            var deferred = $q.defer();
            $http.get(URL.REMOVE_SUBJECT + id)
                .then(function (res) {
                    deferred.resolve(res);
                },
                function (res){
                    deferred.reject(res);
                });

            return deferred.promise;
        }

        function getHeader() {
            return ["№", "Предмет", "Опис предмету"];
        }
    }

})();