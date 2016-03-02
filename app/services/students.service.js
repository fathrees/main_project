(function() {
    "use strict";

    angular.module("app.admin.groups")
        .factory("studentsService", studentsService);

    studentsService.$inject = ["$http", "$q"];

    function studentsService($http, $q) {
        var studentsData;
        var studentsService = {
            //getStudentsData: getStudentsData,
            getStudentsByGroupId: getStudentsByGroupId,
            getHeadElements: getHeadElements

        };

        return studentsService;

        //$q.defer request with filter - to get student`s info from JSON file by he`s/her`s group_id

        function getStudentsByGroupId(url, group_id) {
            if (angular.isUndefined(studentsData)) {
                studentsData = $q.defer();
                $http.get(url).then(
                    function (result) {
                        var filtered = result.data.filter(function (student) {
                            return group_id === student.group_id;
                        });
                        studentsData.resolve(filtered);
                    });
            }

            return studentsData.promise;
        }

        function getHeadElements () {
            return ["Ім'я", "Прізвище", "Пароль", "Група"];
        }



        // todo.
        // function that is written below will be used in the next sprint!

        //function getStudentsData(url) {
        //    return $http.get(url).then(
        //        function (result) {
        //            return result.data;
        //        },
        //        function (reason) {
        //            return reason;
        //        }
        //    );
        //}

    }
})();
