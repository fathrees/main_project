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
            var itSelf = vm.roots.indexOf(vm.admin.username);
            console.log(vm.roots.indexOf(vm.admin.username));
            if ((vm.kindOfSave === "Видалення") && (itSelf > -1)) {
                vm.admin = null;
                vm.roots.splice(itSelf, 1);
            }
        }

        function gotIt() {
            vm.roots = ADMINS_CONST.ROOTS;
            $uibModalInstance.close();
        }
    }
})();