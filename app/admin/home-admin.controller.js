(function() {
    "use strict";

    angular.module("app.admin")
        .controller("HomeAdminController", HomeAdminController);

    HomeAdminController.$inject = ["adminService", "entities", "entitiesUKR"];

    function HomeAdminController(adminService, entities, entitiesUKR) {
        var vm = this;
        vm.statistics = [];
        activate();

        function activate() {
            return adminService.getAllCountRecords().then(function(response) {
                angular.forEach(entities, function(entity) {
                    var entityUKR;
                    var upperEntity = entity.toUpperCase();
                    if (entitiesUKR.hasOwnProperty(upperEntity)) {
                        entityUKR = entitiesUKR[upperEntity];
                    }
                    var tempObj = {title: entityUKR, count: response[entity].data};
                    vm.statistics.push(tempObj);
                });
                return vm.statistics;
            });
        }
    }
})();