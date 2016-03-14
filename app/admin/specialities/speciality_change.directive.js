(function() {
    "use strict";

    angular.module("app.admin")
        .directive("changeDirective", changeDirective);

    changeDirective.$inject = ["SPECIALITIES_CONST"];

    function changeDirective() {

        return {
            restrict: "EA",
            require: "ngModel",
            link: function(scope, element, attr, mCtrl) {

            }
            tempalte:
                '<form name="form" class="row" uib-collapse="!specialities.showForm" ng-submit="specialities.changeSpeciality()">
                    <div class="col-md-3">
                    <input class="form-control" name="specialityName" type="text" ng-model="specialities.newSpeciality.speciality_name"
                placeholder="назва (обов'язково!)"  ng-minlength="{{specialities.minNameLength}}"
                ng-maxlength="{{specialities.maxNameLength}}" required>
                <span ng-show="addForm.specialityName.$error.maxlength"><br>Макс. довжина назви {{specialities.maxNameLength}}!</span>
                <span ng-show="addForm.specialityName.$error.minlength"><br>Мін. довжина назви {{specialities.minNameLength}}!</span>
                </div>
                <div class="col-md-3">
                    <input class="form-control" name="specialityCode" type="text" ng-model="specialities.newSpeciality.speciality_code"
                placeholder="код (обов'язково!)" required validation-directive>
                <span ng-show="addForm.specialityCode.$error.code"><br>Приклади коду: 6.123456, 7.12345678, 8.12345678</span>
                </div>
                <div class="col-md-6 pull-right">
                    <button type="submit" class="btn btn-success" ng-disabled="addForm.$invalid" title="Зберегти">
                    <i class="glyphicon glyphicon-floppy-saved"></i>
                    </button>
                    <button type="reset" class="btn btn-danger" title="Відмінити" ng-click="specialities.showAddForm()">
                    <i class="glyphicon glyphicon-floppy-remove"></i>
                    </button>
                    </div>
                </form>'
        };
    }

})();