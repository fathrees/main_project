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
                removeGroup: removeGroup,
                headers: [
                    {class: "small-space", header: "№"},
                    {class: "medium-space", header: "Назва"},
                    {class: "large-space", header: "Факультет"},
                    {class: "large-space", header: "Спеціальність"},
                    {class: "medium-space", header: "Дія"}
                    ]
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
