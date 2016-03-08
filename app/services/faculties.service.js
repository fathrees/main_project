(function () {
    "use strict";

    angular.module("app.admin")
        .factory("facultiesService", facultiesService);

    facultiesService.$inject = ["$http", "$q"];

    function facultiesService($http, $q) {
        var facultiesList = {};

        var service = {
            getFaculties: getFaculties,
            getOneFaculty: getOneFaculty,
            addFaculty: addFaculty,
            deleteFaculty: deleteFaculty
        };

        return service;

        function getFaculties() {
            if(facultiesList.promise === undefined) {
                facultiesList = $q.defer();
                $http.get("app/admin/faculties/faculties.json").then(function(response) {
                    facultiesList.resolve(response);
                }, function (response) {
                    facultiesList.reject(response);
                });
            }

            return facultiesList.promise;
        }

        function getOneFaculty(id) {
            var facultiesArray = [],
                faculty = $q.defer();
            facultiesList.promise.then(function(response) {
                facultiesArray = response.data.faculties;
                angular.forEach(facultiesArray, function (item){
                    if(item.id === id){
                        faculty.resolve(item);
                    }
                });
            });

            return faculty.promise;
        }

        function deleteFaculty(id) {
            var facultiesArray = [];
            facultiesList.promise.then(function(response) {
                facultiesArray = response.data.faculties;
                angular.forEach(facultiesArray, function (item){
                    if(item.id === id){
                        facultiesArray.splice(facultiesArray.indexOf(item), 1);
                    }
                });
            });
        }

        function addFaculty(faculty) {
            var facultiesArray = [];
            facultiesList.promise.then(function (response) {
                facultiesArray = response.data.faculties;
                facultiesArray[facultiesArray.length] = faculty;
                facultiesArray[facultiesArray.length - 1].id = facultiesArray.length;
            });
        }
    }
})();