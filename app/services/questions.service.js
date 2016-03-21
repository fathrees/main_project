(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("questionsService", questionsService);

    questionsService.$inject = ["$http", "$q", "BASE_URL", "ENTITIES", "ACTIONS", "ENTITY_RANGE_ON_PAGE", "MESSAGE"];

    function questionsService($http, $q, BASE_URL, ENTITIES, ACTIONS, ENTITY_RANGE_ON_PAGE, MESSAGE) {
        var service = {
            getQuestionsRange: getQuestionsRange,
            totalItems: totalItems,
            saveQuestion: saveQuestion,
            removeQuestion: removeQuestion,
            getHeader: getHeader
        };

        return service;

        function _successCallback(response) {
            return response.data;
        }

        function _errorCallback(response) {
            return response;
        }

        function _addQuestion(question) {
            return $http.post(BASE_URL + ENTITIES.QUESTION + ACTIONS.ADD_ENTITY, question)
                .then(_successCallback, _errorCallback);
        }

        function _editQuestion(question) {
            return $http.post(BASE_URL + ENTITIES.QUESTION + ACTIONS.EDIT_ENTITY + question.question_id, question)
                .then(_successCallback, _errorCallback);
        }

        function getQuestionsRange(currentRecordsRange, limit, test_id) {
            return $http.get(BASE_URL + ENTITIES.QUESTION + "/getRecordsRangeByTest/" + test_id + "/" + limit + "/" + currentRecordsRange + "/")
                .then(_successCallback, _errorCallback);
        }

        function totalItems(test_id) {
            var deferred = $q.defer();
            $http.get(BASE_URL + ENTITIES.QUESTION + ACTIONS.COUNT_ENTITY + test_id)
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

        function saveQuestion(question, id) {
            if (question.question_id === undefined) {
                question.test_id = id;
                if (question.attachment === undefined) {
                    question.attachment = "";
                }
                return _addQuestion(question);
            } else {
                return _editQuestion(question);
            }
        }

        function removeQuestion(id) {
            return $http.get(BASE_URL + ENTITIES.QUESTION + ACTIONS.REMOVE_ENTITY + id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {
            return ["№", "Завдання", "Рівень", "Тип"];
        }

    }
})();