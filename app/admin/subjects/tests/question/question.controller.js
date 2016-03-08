(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("QuestionController", QuestionController);

    QuestionController.$inject = [];

    function QuestionController() {
        var vm = this;
    }
})();