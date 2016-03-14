
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

            ADD_SPECIALITY: domain + "speciality/insertData",
            COUNT_SPECIALITIES: domain + "speciality/countRecords",
            EDIT_SPECIALITY: domain + "speciality/update/",
            GET_SPECIALITIES_RANGE: domain + "speciality/getRecordsRange/",
            GET_SPECIALITIES: domain + "speciality/getRecords",
            REMOVE_SPECIALITY: domain + "speciality/del/",

            ADD_SUBJECT: domain + "subject/insertData",
            COUNT_SUBJECTS: domain + "subject/countRecords",
            EDIT_SUBJECT: domain + "subject/update/",
            GET_SUBJECT_RANGE: domain + "subject/getRecordsRange/",
            GET_SUBJECTS: domain + "subject/getRecords",
            REMOVE_SUBJECT: domain + "subject/del/"
        })
        .constant("SPECIALITIES_CONST", {
            MIN_NAME_LENGTH: 2,
            MAX_NAME_LENGTH: 50,
            CODE_REGEXP: /^([6-8]\.\d{6,8})$/
        });
})();