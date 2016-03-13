(function() {
    "use strict";

    angular.module("app.admin")
        .factory("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["$http", "$q", "URL", "APP_CONST"];

    function specialitiesService($http, $q, URL, APP_CONST) {
        var service = {
            getSpecialities: getSpecialities,
            totalItems: totalItems,
            addSpeciality: addSpeciality,
            editSpeciality: editSpeciality,
            removeSpeciality: removeSpeciality,
            getHeader: getHeader
        };

        return service;

        function getSpecialities(currentRecordsRange){
            var deferred = $q.defer();
            $http.get(URL.GET_SPECIALITY_RANGE + APP_CONST.QUANTITY_ON_PAGE+ "/" + currentRecordsRange)
                .then(function(res){
                        deferred.resolve(res.data);
                    },
                    function(res){
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function totalItems(){
            var deferred = $q.defer();
            $http.get(URL.COUNT_SPECIALITIES)
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

        function addSpeciality(newSpeciality){
            var deferred = $q.defer();
            $http.post(URL.ADD_SPECIALITY, newSpeciality)
                .then(function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res){
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function editSpeciality(id, editModel){
            var deferred = $q.defer();
            $http.post(URL.EDIT_SPECIALITY + id, editModel)
                .then(function(res){
                        deferred.resolve(res);
                    },
                    function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function removeSpeciality(id) {
            var deferred = $q.defer();
            $http.get(URL.REMOVE_SPECIALITY + id)
                .then(function(res) {
                        deferred.resolve(res);
                    },
                    function(res){
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function getHeader() {
            return ["№", "Назва", "Код"];
        }
    }

})();