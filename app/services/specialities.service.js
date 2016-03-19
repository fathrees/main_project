(function() {
    "use strict";

    angular.module("app.admin")
        .factory("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["$http", "$q", "BASE_URL", "ENTITIES", "ACTIONS", "ENTITY_RANGE_ON_PAGE"];

    function specialitiesService($http, $q, BASE_URL, ENTITIES, ACTIONS, ENTITY_RANGE_ON_PAGE) {
        var service = {
            getSpecialitiesRange: getSpecialitiesRange,
            getSpecialities: getSpecialities,
            totalItems: totalItems,
            saveSpeciality: saveSpeciality,
            removeSpeciality: removeSpeciality,
            getHeader: getHeader
        };

        return service;

        function _successCallback(result) {

            return result.data;
        }

        function _errorCallback(reason) {

            return reason;
        }

        function getSpecialitiesRange(currentRecordsRange) {
            var deferred = $q.defer();
            $http.get(BASE_URL + ENTITIES.SPECIALITY + ACTIONS.GET_ENTITY_RANGE + ENTITY_RANGE_ON_PAGE + "/" + currentRecordsRange)
                .then(function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function getSpecialities() {
            var deferred = $q.defer();
            $http.get(BASE_URL + ENTITIES.SPECIALITY + ACTIONS.GET_ENTITIES)
                .then(function(res) {
                    deferred.resolve(res.data);
                },
                function(res) {
                    deferred.reject(res);
                });

            return deferred.promise;
        }

        function totalItems() {
            var deferred = $q.defer();
            $http.get(BASE_URL + ENTITIES.SPECIALITY + ACTIONS.COUNT_ENTITY)
                .then(function(res){
                        if(res.status === 200) {
                            deferred.resolve(res.data.numberOfRecords)
                        }
                    },
                    function(res){
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function saveSpeciality(speciality) {
            if (speciality.speciality_id === undefined) {

                return _addSpeciality(speciality);
            } else {

                return _editSpeciality(speciality);
            }
        }

        function _addSpeciality(speciality) {

            return $http.post(BASE_URL + ENTITIES.SPECIALITY + ACTIONS.ADD_ENTITY, speciality)
                .then(_successCallback, _errorCallback);
        }

        function _editSpeciality(speciality) {

            return $http.post(BASE_URL + ENTITIES.SPECIALITY + ACTIONS.EDIT_ENTITY + speciality.speciality_id, speciality)
                .then(_successCallback, _errorCallback);
        }

        function removeSpeciality(id) {

            return $http.get(BASE_URL + ENTITIES.SPECIALITY + ACTIONS.REMOVE_ENTITY + id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {

            return ["№", "Назва", "Код"];
        }
    }

})();