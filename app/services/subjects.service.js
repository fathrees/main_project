(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("subjectsService", subjectsService);

    subjectsService.$inject = ["$http", "$q", "URL"];

    function subjectsService($http, $q, URL) {
        var service = {
            getSubjects: getSubjects,
            addSubject: addSubject,
            editSubject: editSubject,
            removeSubject: removeSubject,
            getHeader: getHeader
        };

        return service;

        function getSubjects(){
            var deferred = $q.defer();
            $http.get(URL.GET_SUBJECTS)
                .then(function (res){
                    deferred.resolve (res.data);
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
                    console.log(res);
                    console.log(res.data);
                    deferred.resolve(res.data);
                },
                function(res){
                    console.log(res);
                    deferred.reject(res);
                });

            return deferred.promise;
        }

        function editSubject(id, editModel){
            var deferred = $q.defer();
            $http.post(URL.EDIT_SUBJECT + id, editModel)
                .then(function(res){
                    console.log("servise success res" + res);
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
                    console.log(res);
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