(function() {
    "use strict";

    angular.module("app")
        .controller("AuthController", AuthController);

    AuthController.$inject = [];

    function AuthController() {
        var vm = this;
    }
})();