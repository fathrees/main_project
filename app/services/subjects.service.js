(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("subjectsService", subjectsService);

    subjectsService.$inject = ["$http", "$q", "PAGINATION", "BASE_URL", "URL"];

    function subjectsService($http, $q, PAGINATION, BASE_URL, URL) {
        var service = {
            getSubjects: getSubjects,
            getOneSubject: getOneSubject,
            totalItems: totalItems,
            saveSubject: saveSubject,
            removeSubject: removeSubject,
            getHeader: getHeader
        };

        return service;

        function _successCallback(response) {
            return response.data;
        }
        function _errorCallback(response) {
            return response;
        }

        function _addSubject (subject){

            return $http.post(BASE_URL + URL.ENTITIES.SUBJECT + URL.ADD_ENTITY, subject)
                .then(_successCallback, _errorCallback);
        }

        function _editSubject(subject){

            return $http.post(BASE_URL + URL.ENTITIES.SUBJECT + URL.EDIT_ENTITY  + subject.subject_id, subject)
                .then(_successCallback, _errorCallback);
        }

        function getSubjects(currentRecordsRange){
            return $http.get(BASE_URL + URL.ENTITIES.SUBJECT + URL.GET_ENTITY_RANGE + PAGINATION.ENTITIES_RANGE_ON_PAGE + "/" + currentRecordsRange)
                .then(_successCallback, _errorCallback);
        }

        function getOneSubject(id) {
            return $http.get(BASE_URL + URL.ENTITIES.SUBJECT + URL.GET_ENTITIES + id)
                .then(_successCallback, _errorCallback);
        }

        function totalItems(){
            var deferred = $q.defer();
            $http.get(BASE_URL + URL.ENTITIES.SUBJECT + URL.COUNT_ENTITY)
                .then(function (res){
                        if(res.status === 200 && res.data.numberOfRecords) {
                            deferred.resolve(res.data.numberOfRecords)
                        }else {
                            deferred.reject(res)
                        }
                    },
                    function(res){
                        deferred.reject (res);
                    });

            return deferred.promise;
        }

        function saveSubject(subject) {
            if (subject.subject_id === undefined) {

                return _addSubject(subject);
            } else {

                return _editSubject(subject);
            }
        }

        function removeSubject(subject) {

            return $http.get(BASE_URL + URL.ENTITIES.SUBJECT + URL.REMOVE_ENTITY + subject.subject_id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {

            return ["Предмет", "Опис предмету"];
        }
    }

})();