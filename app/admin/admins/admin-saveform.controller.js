(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminSaveFormController", AdminSaveFormController);

    AdminSaveFormController.$inject = ["$uibModalInstance", "admin", "kindOfSave"];

    function AdminSaveFormController($uibModalInstance, admin, kindOfSave) {
        var vm = this;
        vm.kindOfSave = kindOfSave;
        vm.admin = admin;
        vm.newPassword = "";
        vm.confirmPassword = "";
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close(vm.admin);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();