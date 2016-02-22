(function() {
    "use strict";

    angular.module("app.admin.groups")
        .factory("GroupsService", GroupsService);

    GroupsService.$inject = [];

    function GroupsService() {
        var groupsService = {

        };

        return groupsService;
    }

})();