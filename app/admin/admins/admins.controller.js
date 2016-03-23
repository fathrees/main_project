(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminsController", AdminsController);

    AdminsController.$inject = ["adminService"];

    function AdminsController(adminService) {
        var vm = this;
        vm.headElements = adminService.getHeader();
        activate();

        function activate() {
            adminService.getAdmins().then(function(data) {
                vm.list = data;
                _parseDate(vm.list);
            });
        }

        function _parseDate(arrObj) {
            for (var i = 0; i < arrObj.length; i++) {
                var newDate = new Date(arrObj[i].last_login*1000);
                newDate = ((newDate.getHours() < 10) ? ("0" + newDate.getHours()) : newDate.getHours()) + ":" +
                    ((newDate.getMinutes() < 10) ? ("0" + newDate.getMinutes()) : newDate.getMinutes()) + " " +
                    ((newDate.getDate() < 10) ? ("0" + newDate.getDate()) : newDate.getDate()) + "." +
                    ((((newDate.getMonth() + 1)) < 10) ? ("0" + (newDate.getMonth() + 1)) : ((newDate.getMonth() + 1))) + "." +
                    newDate.getFullYear();
                arrObj[i].last_login = newDate;
            }
        }
    }
})();