(function() {
    "use strict";

    angular.module("app.admin")
        .directive("validationDirective", validationDirective);

    validationDirective.$inject = ["SPECIALITIES_CONST"];

    function validationDirective (SPECIALITIES_CONST) {
        return {
            restrict: "EA",
            require: "ngModel",
            link: function(scope, element, attr, mCtrl) {
                function validation(value) {
                    if (SPECIALITIES_CONST.CODE_REGEXP.test(value)) {
                        mCtrl.$setValidity("code", true);
                    } else {
                        mCtrl.$setValidity("code", false);
                    }
                    return value;
                }
                mCtrl.$parsers.push(validation);
            }
        };
     };

})();