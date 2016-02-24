(function() {
    "use strict";

    angular.module("app")
        .controller("AuthController", AuthController);

    AuthController.$inject = ["AuthService"];

    function AuthController(AuthService) {
        var vm = this;
        vm.credentials = {};
        vm.authentication = authentication;
        vm.isCollapsed = AuthService.isCollapsed;


        function authentication(){
            AuthService.login(vm.credentials)
        }
    };
})();