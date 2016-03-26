(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminSaveFormController", AdminSaveFormController);

    AdminSaveFormController.$inject = ["$uibModalInstance", "adminService", "admin", "kindOfSave"];

    function AdminSaveFormController($uibModalInstance, adminService, admin, kindOfSave) {
        var vm = this;
        vm.kindOfSave = kindOfSave;
        vm.admin = admin;
        vm.comparePasswords = comparePasswords;
        vm.save = save;
        vm.cancel = cancel;


        function comparePasswords(){
            vm.admin.password = vm.newPassword;
            return (vm.newPassword === vm.confirmPassword);
        }

        function save() {
            $uibModalInstance.close(vm.admin);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();