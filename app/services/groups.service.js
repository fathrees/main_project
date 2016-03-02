(function() {
    "use strict";

    angular.module("app.admin.groups")
        .factory("groupsService", groupsService);

        groupsService.$inject = ['$http'];

        function groupsService($http) {
            var groupsService = {
                getGroups: getGroups,
                addGroup: addGroup,
                editGroup: editGroup,
                removeGroup: removeGroup
            };

            return groupsService;

            function getGroups() {
                return $http.get('app/admin/groups/groups.json')
                    .then(function(result) {
                        return result.data;
                    },
                    function(reason) {
                        return reason;
                    })
            }

            function controllerStorage(data) {

            }

            function addGroup() {

            }

            function editGroup() {

            }

            function removeGroup() {

            }
        }

})();