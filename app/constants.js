(function() {
    "use strict";

    angular.module("app")
        .constant("BASE_URL", "http://dtapi.local/")
        .constant("AUTH", {
            LOGIN: "login/index",
            IS_LOGGED: "login/isLogged",
            LOGOUT: "login/logout"
        })
        .constant("ENTITIES", {
            FACULTY: "faculty",
            SPECIALITY: "speciality",
            GROUP: "group",
            STUDENT: "student",
            SUBJECT: "subject",
            TEST: "test",
            TEST_DETAIL: "test_detail",
            QUESTION: "question",
            ANSWER: "answer",
            RESULT: "result"
        })
        .constant("ENTITIES_UKR", {
            FACULTY: "факультетів",
            SPECIALITY: "спеціальностей",
            GROUP: "груп",
            STUDENT: "студентів",
            SUBJECT: "предметів",
            TEST: "тестів"
        })
        .constant("ACTIONS", {
            ADD_ENTITY: "/insertData/",
            COUNT_ENTITY: "/countRecords/",
            EDIT_ENTITY: "/update/",
            GET_ENTITY_RANGE: "/getRecordsRange/",
            GET_ENTITIES: "/getRecords/",
            REMOVE_ENTITY: "/del/"
        })
        .constant("ENTITY_RANGE_ON_PAGE", 10)
})();