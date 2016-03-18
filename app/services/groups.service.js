(function() {
    "use strict";

    angular.module("app.admin.groups")
        .factory("groupsService", groupsService);

        groupsService.$inject = ['$http', '$q', 'URL'];

        function groupsService($http, $q, URL) {
            //==============================================
            // THE GOAL OF THIS CODE IS TO RETURN ARRAYS OF HASHES
            // [{%faculty_id%: %faculty_name%}, ...]
            // [{%speciality_id%: %speciality_name%}, ...]
            //TODO MOVE TO FACULTIES AND SPECIALITIES SERVICES
            var getFaculties = [{"faculty_id":"1","faculty_name":"\u0406\u043d\u0441\u0442\u0438\u0442\u0443\u0442 \u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u0439\u043d\u0438\u0445 \u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0456\u0439","faculty_description":"\u0406\u0424\u041d\u0422\u0423\u041d\u0413, \u041a\u043e\u0440\u043f\u0443\u0441 \u0424\u0410\u0415 (1), 4 \u043f\u043e\u0432\u0435\u0440\u0445"},{"faculty_id":"2","faculty_name":"\u0406\u043d\u0441\u0442\u0438\u0442\u0443\u0442 \u0433\u0435\u043e\u043b\u043e\u0433\u0456\u0457","faculty_description":"\u0406\u0424\u041d\u0422\u0423\u041d\u0413, \u041a\u043e\u0440\u043f\u0443\u0441 \u0424\u0410\u0415 (1), 5 \u043f\u043e\u0432\u0435\u0440\u0445"},{"faculty_id":"3","faculty_name":"\u0406\u043d\u0441\u0442\u0438\u0442\u0443\u0442 \u0413\u0435\u043e\u043b\u043e\u0433\u0456\u0457","faculty_description":"\u041a\u043e\u0440\u043f\u0443\u0441 \u0413\u0420\u0424 (5), 20 \u043f\u043e\u0432\u0435\u0440\u0445"},{"faculty_id":"6","faculty_name":"\u0424\u0430\u043a\u0443\u043b\u044c\u0442\u0435\u0442 \u0416\u0443\u0440\u043d\u0430\u043b\u0456\u0441\u0442\u0438\u043a\u0438","faculty_description":"\u0406\u0424\u041d\u0422\u0423\u041d\u0413, \u041a\u043e\u0440\u043f\u0443\u0441 \u0424\u0410\u0415 (1), 12 \u043f\u043e\u0432\u0435\u0440\u0445"}]
            var getSpecialities = [{"speciality_id":"1","speciality_code":"6.050201","speciality_name":"\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u0430 \u0456\u043d\u0436\u0435\u043d\u0435\u0440\u0456\u044f"},{"speciality_id":"2","speciality_code":"6.050102","speciality_name":"\u041a\u043e\u043c\u043f\u044e\u0442\u0435\u0440\u043d\u0430 \u0456\u043d\u0436\u0435\u043d\u0435\u0440\u0456\u044f"},{"speciality_id":"3","speciality_code":"6.05010333","speciality_name":"\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043d\u0430 \u0456\u043d\u0436\u0435\u043d\u0435\u0440\u0456\u044f"},{"speciality_id":"4","speciality_code":"6.051003","speciality_name":"\u041f\u0440\u0438\u043b\u0430\u0434\u043e\u0431\u0443\u0432\u0430\u043d\u043d\u044f"},{"speciality_id":"5","speciality_code":"6.050701","speciality_name":"\u0415\u043b\u0435\u043a\u0442\u0440\u043e\u0442\u0435\u0445\u043d\u0456\u043a\u0430 \u0442\u0430 \u0435\u043b\u0435\u043a\u0442\u0440\u043e\u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0456\u0457"},{"speciality_id":"6","speciality_code":"6.040103","speciality_name":"\u0413\u0435\u043e\u043b\u043e\u0433\u0456\u044f"}]
            var gFaculties = [];
            var gSpecialities = [];
            for (var i = 0; i < getFaculties.length; i++) {
                gFaculties[Number(getFaculties[i].faculty_id)] = getFaculties[i].faculty_name;
            }
            for (var i = 0; i < getSpecialities.length; i++) {
                gSpecialities[Number(getSpecialities[i].speciality_id)] = getSpecialities[i].speciality_name;
            }
            //==============================================


            var groupsService = {
                getGroups: getGroups,
                getFaculties: getFaculties,
                getSpecialities: getSpecialities,
                gFaculties: gFaculties,
                gSpecialities: gSpecialities,
                removeGroup: removeGroup,
                editGroup: editGroup,
                addGroup: addGroup,
                headers: [
                    {class: "medium-space", header: "Назва"},
                    {class: "large-space", header: "Факультет"},
                    {class: "large-space", header: "Спеціальність"},
                    {class: "medium-space", header: "Дія"}
                    ]
            };

            return groupsService;

            //function getGroups() {
            //    var deferred = $q.defer();
            //    $http.get(URL.GET_GROUPS)
            //        .then(function (res) {
            //                deferred.resolve(res.data);
            //            },
            //            function (res) {
            //                deferred.reject(res);
            //            });
            //    return deferred.promise;
            //}

            function _succeesCallback(result) {
                return result.data;
            }

            function _errorCallback(reason) {
                return reason;
            }

            function getGroups() {
                return $http.get(URL.GET_GROUPS).then(_succeesCallback, _errorCallback);
            }

            function removeGroup(group_id) {
                return $http.get(URL.REMOVE_GROUP + group_id)
                    .then(function(result) {
                            return result.data;
                        },
                        function (reason) {
                            return reason;
                        })
            }

            function editGroup(group_id, editing) {
                return $http.post(URL.EDIT_GROUP + group_id, editing)
                    .then(function(result) {
                        return result.config.data;
                    },
                    function(reason) {
                        return reason;
                    })
            }

            function addGroup(editing) {
                return $http.post(URL.ADD_GROUP, editing)
                    .then(function(result) {
                        return result.config.data;
                    },
                    function(reason) {
                        return reason;
                    })
            }

            //function getGroupsJSON() {
            //    return $http.get('app/admin/groups/groups.json')
            //        .then(function(result) {
            //                return result.data;
            //            },
            //            function(reason) {
            //                return reason;
            //            })
            //}
        }

})();
