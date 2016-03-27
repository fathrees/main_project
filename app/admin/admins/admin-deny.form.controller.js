(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminDenyFormController", AdminDenyFormController);

    AdminDenyFormController.$inject = ["$uibModalInstance", "ADMINS_CONST", "admin", "kindOfSave"];

    function AdminDenyFormController($uibModalInstance, ADMINS_CONST, admin, kindOfSave) {
        var vm = this;
        vm.admin = admin;
        console.log(admin);
        vm.kindOfSave = kindOfSave;
        vm.roots = ADMINS_CONST.ROOTS;
        vm.cancel = cancel;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();