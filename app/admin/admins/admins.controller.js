(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminsController", AdminsController);

    AdminsController.$inject = ["adminService", "$uibModal"];

    function AdminsController(adminService, $uibModal) {
        var vm = this;
        vm.headElements = adminService.getHeader();
        vm.showSaveForm = showSaveForm;
        vm.animation = true;

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

        function showSaveForm(kindOf) {
            vm.kindOfSave = kindOf;
            if (kindOf === "Реєстрація"){
                vm.admin = {};
            }
            var modalInstance = $uibModal.open({
                animation: vm.animation,
                templateUrl: "app/admin/admins/admin-saveform.html",
                controller: "AdminSaveFormController",
                controllerAs: "adminSave",
                resolve: {
                    admin: function() {
                        return vm.admin;
                    },
                    kindOfSave: function() {
                        return vm.kindOfSave;
                    }
                }
            });

            modalInstance.result.then(
                function(resolve) {
                    vm.admin = resolve;
                },
                function() {
                });
        }
    }
})();