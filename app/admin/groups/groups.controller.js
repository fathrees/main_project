(function() {
    "use strict";

    angular.module("app.admin.groups")
        .controller("GroupsController", GroupsController);

    GroupsController.$inject = [];

    function GroupsController() {
        var vm = this;
    }
})();