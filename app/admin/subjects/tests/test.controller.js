(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestController", TestController);

    TestController.$inject = ["$stateParams", "testService"];

    function TestController($stateParams, testService) {
        var vm = this;
        vm.showSaveForm = showSaveForm;
        vm.hideSaveForm = hideSaveForm;
        vm.saveFormCollapsed = true;
        vm.headElements = testService.getHeader();
        vm.saveQuestion = saveQuestion;
        vm.removeQuestion = removeQuestion;
        vm.image;
        vm.levels = ["1", "2", "3", "4", "5"];
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
            testService.getQuestionsRange(vm.currentRecordsRange, 10, $stateParams.test_id).then(function(data) {
                vm.questionsList = data;
            });
        }

        function showSaveForm(question) {
            vm.saveFormCollapsed = false;
            vm.image = null;
            if (question === undefined) {
                vm.question = {};
            } else {
                vm.question = question;
                if (question.attachment != "") {
                    vm.image = question.attachment;
                }
            }
        }

        function hideSaveForm() {
            vm.saveFormCollapsed = true;
            vm.question = {};
            vm.image = null;
        }

        function saveQuestion() {
            if (vm.image != null) {
                vm.question.attachment = vm.image;
            }
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
            vm.currentRecordsRange = (vm.currentPage - 1) * 10;
        }

        function pageChanged(){
            getNextRange();
            testService.getQuestionsRange(vm.currentRecordsRange, 10, $stateParams.test_id).then(function(data) {
                vm.questionsList = data;
            });
        }
    }
})();