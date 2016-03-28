(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminsController", AdminsController);

    AdminsController.$inject = ["adminService", "authService", "$uibModal", "ADMINS_CONST"];

    function AdminsController(adminService, authService, $uibModal, ADMINS_CONST) {
        var vm = this;
        vm.headElements = adminService.getHeader();
        vm.adminAccess = adminAccess;
        vm.showSaveForm = showSaveForm;
        vm.removeAdmin = removeAdmin;
        vm.animation = true;

        activate();

        function activate() {
            adminService.getAdmins().then(function(data) {
                vm.list = data;
                adminService.parseDate(vm.list);
            });
        }

        function adminAccess(admin, kindOfSave) {
            authService.isLogged().then(function(res){
                vm.logged = res;
                var isRoot = (ADMINS_CONST.ROOTS.indexOf(vm.logged.username) > -1);
                var itSelf = (admin.id === vm.logged.id);
                if (itSelf || isRoot) {
                    if (kindOfSave === "Редагування") {
                        showSaveForm(admin, kindOfSave);
                    }else if (!itSelf) {
                        removeAdmin(admin);
                    }else{
                        showDenyForm(admin, kindOfSave);
                    }
                } else {
                    showDenyForm(admin, kindOfSave);
                }
            });
        }

        function showDenyForm(admin, kindOfSave){
            var modalInstance = $uibModal.open({
                animation: vm.animation,
                size: "sm",
                templateUrl: "app/admin/admins/admin-deny.form.html",
                controller: "AdminDenyFormController",
                controllerAs: "adminDeny",
                resolve: {
                    admin: function () {
                        return admin;
                    },
                    kindOfSave: function () {
                        return kindOfSave;
                    }
                }
            });
        }

        function showSaveForm(admin, kindOfSave) {
            vm.admin = admin;
            vm.kindOfSave = kindOfSave;
            var modalInstance = $uibModal.open({
                animation: vm.animation,
                templateUrl: "app/admin/admins/admin-save.form.html",
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
                function(admin) {
                    vm.admin = admin;
                    if (admin.id === undefined) {
                        _addAdmin(vm.admin);
                    }else{
                        _editAdmin(vm.admin);
                    }
                },
                function() {
                });
        }

        function _addAdmin(admin) {
            adminService.addAdmin(admin).then(function(res){
                activate();
            });
        }

        function _editAdmin(admin) {
            adminService.editAdmin(admin).then(function(res){
                activate();
            });
        }

        function removeAdmin(admin) {
            adminService.removeAdmin(admin).then(function(res){
                activate();
            });
        }
    }
})();