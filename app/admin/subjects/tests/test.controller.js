(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestController", TestController);

    TestController.$inject = ["$stateParams", "testService", "APP_CONST"];

    function TestController($stateParams, testService, APP_CONST) {
        var vm = this;
        vm.showSaveForm = showSaveForm;
        vm.hideSaveForm = hideSaveForm;
        vm.saveFormCollapsed = true;
        vm.headElements = testService.getHeader();
        vm.saveQuestion = saveQuestion;
        vm.removeQuestion = removeQuestion;
        vm.levels = [1, 2, 3, 4, 5];
        vm.types = [{name: "Простий вибір", value: "1"}, {name: "Мульти-вибір", value: "2"}];
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.pageChanged = pageChanged;
        activate();

        function activate() {
            testService.totalItems($stateParams.test_id).then(function(quantity) {
                vm.totalItems = +quantity;
            });
            testService.getQuestionsRange(vm.currentRecordsRange, $stateParams.test_id).then(function(data) {
                vm.questionsList = data;
            });
        }

        function showSaveForm(question) {
            vm.saveFormCollapsed = false;
            if (question === null) {
                vm.question = {};
            } else {
                vm.question = question;
            }
        }
        function hideSaveForm() {
            vm.saveFormCollapsed = true;
            vm.question = {};
        }

        function saveQuestion() {
            testService.saveQuestion(vm.question, $stateParams.test_id).then(function(response) {
                activate();
                vm.hideSaveForm();
            });
        }

        function removeQuestion(question) {
            testService.removeQuestion(question.question_id).then(function(response) {
                activate();
            });
        }

        function getNextRange() {
            vm.currentRecordsRange = (vm.currentPage - 1) * APP_CONST.QUANTITY_ON_PAGE;
        }

        function pageChanged(){
            getNextRange();
            testService.getQuestionsRange(vm.currentRecordsRange, $stateParams.test_id).then(function(data) {
                vm.questionsList = data;
            });
        }
    }
})();