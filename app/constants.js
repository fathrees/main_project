
(function() {
    "use strict";

    var domain = "http://dtapi.local/";

    angular.module("app")
        .constant("APP_CONST", {
        QUANTITY_ON_PAGE: 10
    })
        .constant("URL", {
            LOGIN: domain + "login/index",
            ISLOGGED: domain + "login/isLogged",
            LOGOUT: domain + "login/logout",

            ADD_SUBJECT: domain + "subject/insertData",
            COUNT_SUBJECTS: domain + "subject/countRecords",
            EDIT_SUBJECT: domain + "subject/update/",
            GET_SUBJECT_RANGE: domain + "subject/getRecordsRange/",
            GET_SUBJECTS: domain + "subject/getRecords",
            REMOVE_SUBJECT: domain + "subject/del/",
        });
})();