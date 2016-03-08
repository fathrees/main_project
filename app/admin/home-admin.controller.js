(function() {
    "use strict";

    angular.module("app.admin")
        .controller("HomeAdminController", HomeAdminController);

    HomeAdminController.$inject = ["adminService", "urls"];

    function HomeAdminController(adminService, urls) {
        var vm = this;
        vm.statistics = [];
        activate();

        function activate() {
            return adminService.getAllCountRecords().then(function(response) {
                angular.forEach(urls, function(item) {
                    var tempObj = {title: item.title, count: response[item.name].data};
                    vm.statistics.push(tempObj);
                });
                return vm.statistics;
            });
        }
    }
})();