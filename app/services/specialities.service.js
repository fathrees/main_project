(function () {
    "use strict";

    angular.module("app.admin")
        .factory("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["$http", "$q"];

    function specialitiesService($http, $q) {
        var specialitiesList = {};

        var service = {
            getSpecialities: getSpecialities,
            getOneSpeciality: getOneSpeciality,
            addSpeciality: addSpeciality,
            deleteSpeciality: deleteSpeciality
        };

        return service;

        function getSpecialities() {
            if(specialitiesList.promise === undefined) {
                specialitiesList = $q.defer();
                $http.get("app/admin/specialities/json/specialities.json").then(function(response) {
                    specialitiesList.resolve(response);
                }, function (response) {
                    specialitiesList.reject(response);
                });
            }

            return specialitiesList.promise;
        }

        function getOneSpeciality(id) {
            var specialitiesArray = [],
                speciality = $q.defer();
            specialitiesList.promise.then(function(response) {
                specialitiesArray = response.data.specialities;
                angular.forEach(specialitiesArray, function (item){
                    if(item.id === id){
                        speciality.resolve(item);
                    }
                });
            });

            return speciality.promise;
        }

        function deleteSpeciality(id) {
            var specialitiesArray = [];
            specialitiesList.promise.then(function(response) {
                specialitiesArray = response.data.specialities;
                angular.forEach(specialitiesArray, function (item){
                    if(item.id === id){
                        specialitiesArray.splice(specialitiesArray.indexOf(item), 1);
                    }
                });
            });
        }

        function addSpeciality(speciality) {
            var specialitiesArray = [];
            specialitiesList.promise.then(function(response) {
                specialitiesArray = response.data.specialities;
                specialitiesArray[specialitiesArray.length] = speciality;
                specialitiesArray[specialitiesArray.length-1].id = specialitiesArray.length;
            });
        }
    }
})();