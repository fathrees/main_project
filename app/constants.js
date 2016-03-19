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
            TEST_DETAIL: "testDetail",
            QUESTION: "question",
            ANSWER: "answer",
            RESULT: "result"
        })

        .constant("ACTIONS", {
            ADD_ENTITY: "/insertData/",
            COUNT_ENTITY: "/countRecords",
            COUNT_RECORDS_BY_TEST: "/countRecordsByTest/",
            EDIT_ENTITY: "/update/",
            GET_ENTITY_RANGE: "/getRecordsRange/",
            GET_ENTITIES: "/getRecords/",
            GET_RECORDS_RANGE_BY_TEST: "/getRecordsRangeByTest/",
            GET_TEST_BY_SUBJECT: "/getTestsBySubject/",
            GET_TEST_DETAILS: "/getTestDetailsByTest/",
            GET_QUESTIONS_BY_LEVEL_RAND: "/getQuestionsByLevelRand/",
            REMOVE_ENTITY: "/del/"
        })
        .constant("ENTITY_RANGE_ON_PAGE", 10)

        .constant("REGEXP", {
            ONLY_NUMBER: /^[0-9]+$/,
        })

        .constant("ENTITIES_UKR", {
            FACULTY: "факультетів",
            SPECIALITY: "спеціальностей",
            GROUP: "груп",
            STUDENT: "студентів",
            SUBJECT: "предметів",
            TEST: "тестів"
        })

        .constant("MESSAGE", {
            SAVE_SUCCSES: "Зміни збережено",
            SAVE_ERROR: "Помилка. Зміни не збережено",
            DEL_CONFIRM: "Ви підтверджуєте видалення? Дію неможливо відмінити",
            DEL_SUCCESS: "Видалення успішне",
            DEL_ERROR:"Помилка видалення"
        });
})();