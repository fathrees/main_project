(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("testsService", testsService);

    testsService.$inject = ["$http", "BASE_URL", "ENTITIES", "ACTIONS", ];

    function testsService($http, BASE_URL, ENTITIES, ACTIONS) {

        var usedLevel = [];
        var availableLevel;

        var service = {
            getTests: getTests,
            getOneTest: getOneTest,
            saveTest: saveTest,
            removeTest: removeTest,
            getHeader: getHeader,
            getStatus: getStatus,
            getTestDetails: getTestDetails,
            removeTestLevel: removeTestLevel,
            getLevel: getLevel,
            getHeaderTestDetail: getHeaderTestDetail
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

        //ТESTS-DETAILS

        function getTestDetails (test_id) {
            return $http.get(BASE_URL + ENTITIES.TEST_DETAIL + ACTIONS.GET_TEST_DETAILS + "/" + test_id)
                .then(_successCallback, _errorCallback);
        }

        function removeTestLevel (id) {

            return $http.get(BASE_URL + ENTITIES.TEST_DETAIL + ACTIONS.REMOVE_ENTITY + id)
                .then(_successCallback, _errorCallback);
        }

        /**
         * This function filterred available level for select tag.
         * @param {array} arrTestdetail is array of objects with properties for current level
         * @returns {array} availableLevel is the array with available level for select tag
         */

        function getLevel (arrTestdetail){
            var level = []
            arrTestdetail.forEach(function(item){
                usedLevel.push(item.level);
            });
            for (var i = 1; i <= 7; i++){
                level.push(i);
            };
            level.push("Рівень");
            availableLevel = level.filter(function(itemLevel){

                return usedLevel.every(function (usedItem) {
                    return usedItem != itemLevel;
                });
            });

            return availableLevel;
        }


        function getHeaderTestDetail() {

            return ["Номер рівня", "Кількість завдань", "Кількість балів", "Управління"];
        }




    }
})();