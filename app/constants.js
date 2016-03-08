
(function() {
    "use strict";

    var domain = "http://dtapi.local/";

    angular.module("app")
        .constant("URL", {
            LOGIN: domain + "login/index",
            ISLOGGED: domain + "login/isLogged",
            LOGOUT: domain + "login/logout",

            ADD_SUBJECT: domain + "subject/insertData",
            COUNT_SUBJECTS: domain + "subject/countRecords",
            EDIT_SUBJECT: domain + "subject/update/",
            GET_SUBJECTS: domain + "subject/getRecords",
            REMOVE_SUBJECT: domain + "subject/del/",
        });
})();