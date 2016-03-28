(function() {
    "use strict";

    angular.module("app.admin")
        .controller("AdminDenyFormController", AdminDenyFormController);

    AdminDenyFormController.$inject = ["$uibModalInstance", "ADMINS_CONST", "admin", "kindOfSave"];

    function AdminDenyFormController($uibModalInstance, ADMINS_CONST, admin, kindOfSave) {
        var vm = this;
        vm.admin = admin;
        vm.kindOfSave = kindOfSave;
        vm.roots = ADMINS_CONST.ROOTS;
        vm.gotIt = gotIt;

        delItSelf();

        function delItSelf() {
            vm.isRoot = (vm.roots.indexOf(vm.admin.username) > -1);
        }

        function gotIt() {
            $uibModalInstance.close();
        }
    }
})();