(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("questionsService", questionsService);

    questionsService.$inject = ["$http", "$q", "BASE_URL", "URLS", "PAGINATION"];

    function questionsService($http, $q, BASE_URL, URLS, PAGINATION) {
        var service = {
            getQuestionsRange: getQuestionsRange,
            getCountQuestionsByTest: getCountQuestionsByTest,
            getOneQuestion: getOneQuestion,
            saveQuestion: saveQuestion,
            removeQuestion: removeQuestion,
            getHeader: getHeader,
            getLevels: getLevels,
            getTypes: getTypes
        };

        return service;

        function _successCallback(response) {
            return response.data;
        }

        function _errorCallback(response) {
            return response;
        }

        function _addQuestion(question) {
            return $http.post(BASE_URL + URLS.ENTITIES.QUESTION + URLS.ADD_ENTITY, question)
                .then(_successCallback, _errorCallback);
        }

        function _editQuestion(question) {
            return $http.post(BASE_URL + URLS.ENTITIES.QUESTION + URLS.EDIT_ENTITY + question.question_id, question)
                .then(_successCallback, _errorCallback);
        }

        function getQuestionsRange(currentRecordsRange, test_id) {
            return $http.get(BASE_URL + URLS.ENTITIES.QUESTION + URLS.GET_RECORDS_RANGE_BY_TEST + test_id + "/"
                + PAGINATION.ENTITIES_RANGE_ON_PAGE + "/" + currentRecordsRange + "/")
                .then(_successCallback, _errorCallback);
        }

        function getCountQuestionsByTest(test_id) {
            var deferred = $q.defer();
            $http.get(BASE_URL + URLS.ENTITIES.QUESTION + URLS.COUNT_RECORDS_BY_TEST + test_id)
                .then(function(response){
                        if(response.status === 200) {
                            deferred.resolve(response.data.numberOfRecords)
                        }
                    },
                    function(response){
                        deferred.reject(response);
                    });

            return deferred.promise;
        }

        function getOneQuestion(question_id) {
            return $http.get(BASE_URL + URLS.ENTITIES.QUESTION + URLS.GET_ENTITIES + question_id)
                .then(_successCallback, _errorCallback);
        }
        
        function saveQuestion(question, test_id) {
            if (question.question_id === undefined) {
                question.test_id = test_id;
                if (question.attachment === undefined) {
                    question.attachment = "";
                }
                return _addQuestion(question);
            } else {
                return _editQuestion(question);
            }
        }

        function removeQuestion(question_id) {
            return $http.get(BASE_URL + URLS.ENTITIES.QUESTION + URLS.REMOVE_ENTITY + question_id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {
            return ["Завдання", "Рівень", "Тип"];
        }

        function getLevels() {
            var levels = [];
            for (var i = 1; i <= 7; i++){
                levels.push(i.toString());
            }
            
            return levels;
        }
        
        function getTypes() {
            return [{name: "Простий вибір", value: "1"}, {name: "Мульти-вибір", value: "2"}];
        }
    }
})();