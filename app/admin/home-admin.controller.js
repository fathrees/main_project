(function() {
    "use strict";

    angular.module("app.admin")
        .controller("HomeAdminController", HomeAdminController);

    HomeAdminController.$inject = ["adminService", "ENTITIES", "ENTITIES_UKR"];

    function HomeAdminController(adminService, ENTITIES, ENTITIES_UKR) {
        var vm = this;
        vm.statistics = [];
        activate();

        function activate() {
            return adminService.getAllCountRecords().then(function(response) {
                angular.forEach(ENTITIES, function(entity) {
                    if ((entity != "test_detail") && (entity != "question") && (entity != "answer") && (entity != "result")) {
                        var entityUKR;
                        var upperEntity = entity.toUpperCase();
                        if (ENTITIES_UKR.hasOwnProperty(upperEntity)) {
                            entityUKR = ENTITIES_UKR[upperEntity];
                        }
                        var tempObj = {title: entityUKR, count: response[entity].data};
                        vm.statistics.push(tempObj);
                    }
                });
                return vm.statistics;
            });
        }
    }
})();