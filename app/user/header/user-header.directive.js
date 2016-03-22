(function() {
    "use strict";

    angular.module("app.user")
        .directive("userHeader", userHeader);

    userHeader.$inject = [];

    function userHeader() {
        var directive = {
            templateUrl: "app/user/header/user-header.directive.html",
            replace: true,
            controller: UserHeaderController,
            controllerAs: "header"
        };

        return directive;
    }

    UserHeaderController.$inject = ["authService"];

    function UserHeaderController(authService) {
        var vm = this;
        vm.logout = logout;
        activate();

        function logout(){
            authService.logout().then(function (res) {});
        }

        function activate(){
            authService.isLogged().then(function (res){
                 vm.username = res.username;
            })
        }
    }
})();