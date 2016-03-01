(function() {
    "use strict";

    angular.module("app.admin")
        .directive("appHeader", appHeader);

    appHeader.$inject = [];

    function appHeader() {
        var directive = {
            templateUrl: "app/admin/header/header.directive.html",
            replace: true,
            controller: HeaderController,
            controllerAs: "header"
        };

        return directive;

    }

    HeaderController.$inject = ["authService"];

    function HeaderController(authService) {
        var vm = this;
        vm.logout = logout;
        activate();

        function logout (){
            authService.logout().then(function (res) {});
        }

        function activate (){
            authService.isLogged().then(function (res){
                 vm.username = res.username;
            })
        }
    }


})();