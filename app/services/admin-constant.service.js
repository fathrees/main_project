(function () {
    "use strict";

    angular.module("app.admin")
        .constant("domain", "http://dtapi.local/")
        .constant("entities", {
            FACULTY: "faculty",
            SPECIALITY: "speciality",
            GROUP: "group",
            STUDENT: "student",
            SUBJECT: "subject",
            TEST: "test"
        })
        .constant("entitiesUKR", {
            FACULTY: "факультетів",
            SPECIALITY: "спеціальностей",
            GROUP: "груп",
            STUDENT: "студентів",
            SUBJECT: "предметів",
            TEST: "тестів"
        })
        .constant("actions", {
            ADD_ENTITY: "/insertData/",
            COUNT_ENTITY: "/countRecords/",
            EDIT_ENTITY: "/update/",
            GET_ENTITY_RANGE: "/getRecordsRange/",
            GET_ENTITIES: "/getRecords/",
            REMOVE_ENTITY: "/del/"
        })
})();