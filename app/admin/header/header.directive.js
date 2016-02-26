(function() {
    "use strict";

    angular.module("app.admin")
        .directive("appHeader", appHeader);

    appHeader.$inject = [];

    function appHeader() {
        var directive = {
            templateUrl: "app/admin/header/header.directive.html",
            replace: true
        };

        return directive;
    }

})();