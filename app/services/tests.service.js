(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("testsService", testsService);

    testsService.$inject = ["$http", "BASE_URL", "ENTITIES", "ACTIONS"];

    function testsService($http, BASE_URL, ENTITIES, ACTIONS) {
        var service = {
            getTests: getTests,
            getOneTest: getOneTest,
            saveTest: saveTest,
            removeTest: removeTest,
            getHeader: getHeader,
            getStatus: getStatus
        };

        return service;

        function _successCallback(response) {
            return response.data;
        }
        function _errorCallback(response) {

            return response;
        }

        function getTests (subjectId) {
            return $http.get(BASE_URL + ENTITIES.TEST + ACTIONS.GET_TEST_BY_SUBJECT + "/" + subjectId)
                .then(_successCallback, _errorCallback);

            return deferred.promise;
        }

        function getOneTest (id) {
            return $http.get(BASE_URL + ENTITIES.TEST + ACTIONS.GET_ENTITIES + id)
                .then(_successCallback, _errorCallback);
        }

        function saveTest(test) {
            if (test.test_id === undefined) {

                return _addTest(test);
            } else {

                return _editTest(test);
            }
        }

        function _addTest (test){

            return $http.post(BASE_URL + ENTITIES.TEST + ACTIONS.ADD_ENTITY, test)
                .then(_successCallback, _errorCallback);
        }

        function _editTest (test) {

            return $http.post(BASE_URL + ENTITIES.TEST + ACTIONS.EDIT_ENTITY + test.test_id, test)
                .then(_successCallback, _errorCallback);
        }

        function removeTest (id) {

            return $http.get(BASE_URL + ENTITIES.TEST + ACTIONS.REMOVE_ENTITY + id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {

            return ["Назва тесту", "Завдань", "Тривалість, хв", "Статус"];
        }

        function getStatus() {
            var status = [{
                value: 0,
                enabled: "Недоступно"
            },{
                value: 1,
                enabled: "Доступно"
            }];

            return status;
        }
    }
})();