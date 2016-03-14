(function() {
    "use strict";

    angular.module("app.admin")
        .directive("validateDirective", validateDirective);

    validateDirective.$inject = ["SPECIALITIES_CONST", "specialitiesService"];

    function validateDirective(SPECIALITIES_CONST, specialitiesService) {
        var all = specialitiesService.getSpecialities().then(function(data){
            return data;
        });

        function validCode(regexp, code) {
            return regexp.test(code);
        }

        function existCode(all, code){
            var arr = all.$$state.value;
            for (var i = 0; i < arr.lenght; i++) {
                console.log(arr[i].speciality_code);
                return ((arr[i].speciality_code.indexOf(code) < 0) ? false : true);
            };
        }

        return {
            restrict: "EA",
            require: "ngModel",
            //controller: "SpecialitiesController",
            //controllerAs: "specialities",
            link: function(scope, element, attr, mCtrl) {
                function validation(value) {
                    mCtrl.$setValidity("validCode", validCode(SPECIALITIES_CONST.CODE_REGEXP, value));
                    mCtrl.$setValidity("existCode", existCode(all, value));

                    return value;
                }
                mCtrl.$parsers.push(validation);
            }
        };
     };

})();