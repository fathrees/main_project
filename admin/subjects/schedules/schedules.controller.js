(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SchedulesController", SchedulesController);

    SchedulesController.$inject = [];

    function SchedulesController() {
        var vm = this;
    }
})();