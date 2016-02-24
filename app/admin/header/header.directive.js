(function() {
    "use strict";

    angular.module("app.admin")
        .directive("appHeader", appHeader);

    function appHeader() {
        var headerDirective = {
            templateUrl: "app/admin/header/header.directive.html",
            replace: true
        };

        return headerDirective;
    }

})();