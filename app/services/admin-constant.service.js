(function() {
    "use strict";

    angular.module("app.admin")
        .constant("urls", [
            {ENTITYNAME: "faculty", URL: "http://dtapi.local/faculty/countRecords", TITLE: "факультетів"},
            {ENTITYNAME: "speciality", URL: "http://dtapi.local/speciality/countRecords", TITLE: "спеціальностей"},
            {ENTITYNAME: "group", URL: "http://dtapi.local/group/countRecords", TITLE: "груп"},
            {ENTITYNAME: "student", URL: "http://dtapi.local/student/countRecords", TITLE: "студентів"},
            {ENTITYNAME: "subject", URL: "http://dtapi.local/subject/countRecords", TITLE: "предметів"},
            {ENTITYNAME: "test", URL: "http://dtapi.local/test/countRecords", TITLE: "тестів"}
        ])

})();