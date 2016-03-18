(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .factory("testService", testService);

    testService.$inject = ["$http", "$q"];

    function testService($http, $q) {
        var service = {
            getQuestionsRange: getQuestionsRange,
            getQuestions: getQuestions,
            totalItems: totalItems,
            saveQuestion: saveQuestion,
            removeQuestion: removeQuestion,
            getHeader: getHeader

        };

        return service;

        function _successCallback(response) {
            console.log(response);
            return response.data;
        }

        function _errorCallback(response) {
            console.log(response);
            return response;
        }

        function _addQuestion(question) {
            return $http.post("http://dtapi.local/question/insertData/", question)
                .then(_successCallback, _errorCallback);
        }

        function _editQuestion(question) {
            return $http.post("http://dtapi.local/question/update/" + question.question_id, question)
                .then(_successCallback, _errorCallback);
        }

        function getQuestionsRange(currentRecordsRange, test_id) {
            var limit = 50;
            return $http.get("http://dtapi.local/question/getRecordsRangeByTest/" + test_id + "/" + limit + "/" + currentRecordsRange + "/")
                .then(_successCallback, _errorCallback);
        }

        function getQuestions() {
            return $http.get("http://dtapi.local/question/getRecords/")
                .then(_successCallback, _errorCallback);
        }

        function totalItems(test_id) {
            var deferred = $q.defer();
            $http.get("http://dtapi.local/question/countRecords/" + test_id)
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
            return $http.get("http://dtapi.local/question/del/" + id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {
            return ["№", "Завдання", "Рівень", "Тип"];
        }

    }

})();