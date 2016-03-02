(function() {
    "use strict";

    angular.module("app.admin")
        .constant("specialitiesConstant", specialitiesConstant);

    specialitiesConstant.$inject = [];

    function specialitiesConstant() {
        var specConst = {
            requests: {
                getRecords: {
                    server: "http://dtapi.local/speciality/getRecords",
                    jsonFile: "app/admin/specialities/json/specialities.json"
                },
                countRecords: {
                    server: "http://dtapi.local/speciality/countRecords",
                    jsonFile: ""
                },
                getRecordsRange: {
                    server: "http://dtapi.local/speciality/getRecordsRange/",
                    jsonFile: ""
                },
                insertData: {
                    server: "http://dtapi.local/faculty/insertData",
                    jsonFile: ""
                }
            },
            countPerPage: 10
        }

        return specConst;
    }
})();
