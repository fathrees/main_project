(function() {
    "use strict";

    angular.module("app.admin")
        .factory("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["$http", "$q", "BASE-URL", "ENTITIES", "ACTIONS", "ENTITY_RANGE_ON_PAGE"];

    function specialitiesService($http, $q, BASE-URL, ENTITIES, ACTIONS, ENTITY_RANGE_ON_PAGE) {
        var service = {
            getSpecialitiesRange: getSpecialitiesRange,
            getSpecialities: getSpecialities,
            totalItems: totalItems,
            saveSpeciality: saveSpeciality,
            removeSpeciality: removeSpeciality,
            getHeader: getHeader
        };

        return service;

        function getSpecialitiesRange(currentRecordsRange) {
            var deferred = $q.defer();
            $http.get(BASE-URL.ENTITIES.GET_ENTITY_RANGE + ENTITY_RANGE_ON_PAGE + "/" + currentRecordsRange)
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
            $http.get(BASE-URL.ENTITIES.GET_ENTITIES)
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
            $http.get(BASE-URL.ENTITIES.COUNT_ENTITY)
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
            var deferred = $q.defer();
            $http.post(BASE-URL.ENTITIES.ADD_ENTITY, speciality)
                .then(function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res){
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function _editSpeciality(speciality) {
            var deferred = $q.defer();
            $http.post(BASE-URL.ENTITIES.EDIT_ENTITY + speciality.speciality_id, speciality)
                .then(function(res) {
                        deferred.resolve(res);
                    },
                    function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function removeSpeciality(id) {
            var deferred = $q.defer();
            $http.get(BASE-URL.ENTITIES.REMOVE_ENTITY + id)
                .then(function(res) {
                        deferred.resolve(res);
                    },
                    function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function getHeader() {
            return ["№", "Назва", "Код"];
        }
    }

})();