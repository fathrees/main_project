(function(){
    "use strict";

    angular.module("app.admin.groups")
        // returns an array of unique properties taken from an array of objects
        .filter("unique", function() {
            return function(data, entity) {
                // to avoid an exception while the data is being loaded make this check
                if (angular.isArray(data) && angular.isString(entity)) {
                    var result = [];
                    var checked = {};
                    for (var i = 0; i < data.length; i++) {
                        var dataEntity = data[i][entity];
                        // if the property hasn't been added, adds it to the result array
                        if (angular.isUndefined(checked[dataEntity])) {
                            checked[dataEntity] = true;
                            result.push(dataEntity);
                        }
                    }
                    return result;
                } else {
                    return data;
                }
            }
        })
})();