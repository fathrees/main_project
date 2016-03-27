(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);

    adminService.$inject = ["$http", "$q", "BASE_URL", "URL", "ENTITIES_UKR"];

    function adminService($http, $q, BASE_URL, URL, ENTITIES_UKR) {
        var service = {
            getAdmins: getAdmins,
            parseDate: parseDate,
            comparePasswords: comparePasswords,
            addAdmin: addAdmin,
            editAdmin: editAdmin,
            removeAdmin: removeAdmin,
            getHeader: getHeader,
            getAllCountRecords: getAllCountRecords
        };

        return service;

        function _successCallback(result) {

            return result.data;
        }

        function _errorCallback(reason) {

            return reason;
        }

        function getAdmins() {
            var deferred = $q.defer();
            $http.get(BASE_URL + URL.ENTITIES.ADMINS + URL.GET_ENTITIES)
                .then(function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
        }

        function parseDate(arrObj) {
            for (var i = 0; i < arrObj.length; i++) {
                if (arrObj[i].logins != 0) {
                    var newDate = new Date(arrObj[i].last_login * 1000);
                    newDate = ((newDate.getHours() < 10) ? ("0" + newDate.getHours()) : newDate.getHours()) + ":" +
                        ((newDate.getMinutes() < 10) ? ("0" + newDate.getMinutes()) : newDate.getMinutes()) + " " +
                        ((newDate.getDate() < 10) ? ("0" + newDate.getDate()) : newDate.getDate()) + "." +
                        ((((newDate.getMonth() + 1)) < 10) ? ("0" + (newDate.getMonth() + 1)) : ((newDate.getMonth() + 1))) + "." +
                        newDate.getFullYear();
                    arrObj[i].last_login = newDate;
                }else{
                    arrObj[i].last_login = "Не було";
                }
            }
        }

        function comparePasswords(newPassword, confirmPassword){
            return (newPassword === confirmPassword);
        }

        function addAdmin(admin) {

            return $http.post(BASE_URL + URL.ENTITIES.ADMINS + URL.ADD_ENTITY, admin)
                .then(_successCallback, _errorCallback);
        }

        function editAdmin(admin) {

            return $http.post(BASE_URL + URL.ENTITIES.ADMINS + URL.EDIT_ENTITY + admin.id, admin)
                .then(_successCallback, _errorCallback);
        }

        function removeAdmin(admin) {

            return $http.get(BASE_URL + URL.ENTITIES.ADMINS + URL.REMOVE_ENTITY + admin.id)
                .then(_successCallback, _errorCallback);
        }

        function getHeader() {

            return ["Логін", "E-mail", "Відвідування", "Разів"];
        }

        function getAllCountRecords() {
            var deferred = $q.defer();
            var urlCalls = {};
            angular.forEach(URL.ENTITIES, function(entity) {
                if (ENTITIES_UKR.hasOwnProperty(entity.toUpperCase())) {
                    urlCalls[entity] = $http.get(BASE_URL + entity + URL.COUNT_ENTITY);
                }
            });
            $q.all(urlCalls).then(function(response) {
                var statistics = [];
                angular.forEach(URL.ENTITIES, function(entity) {
                    if (ENTITIES_UKR.hasOwnProperty(entity.toUpperCase())) {
                        var entityUKR;
                        var upperEntity = entity.toUpperCase();
                        if (ENTITIES_UKR.hasOwnProperty(upperEntity)) {
                            entityUKR = ENTITIES_UKR[upperEntity];
                        }
                        var tempObj = {title: entityUKR, count: response[entity].data.numberOfRecords};
                        statistics.push(tempObj);
                    }
                });
                deferred.resolve(statistics);
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

})();