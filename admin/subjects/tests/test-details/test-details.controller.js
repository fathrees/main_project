(function() {
    "use strict";

    angular.module("app.admin")
        .controller("TestDetailsController", TestDetailsController);

    TestDetailsController.$inject = [];

    function TestDetailsController() {
        var vm = this;
    }
})();