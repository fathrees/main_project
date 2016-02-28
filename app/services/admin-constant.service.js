(function() {
    "use strict";

    angular.module("app.admin")
        .constant("urls", [
            {name: "faculty", json: "app/admin/count-faculty.json", "title": "факультетів"},
            {name: "speciality", json: "app/admin/count-speciality.json", "title": "спеціальностей"},
            {name: "group", json: "app/admin/count-group.json", "title": "груп"},
            {name: "student", json: "app/admin/count-student.json", "title": "студентів"},
            {name: "subject", json: "app/admin/count-subject.json", "title": "предметів"},
            {name: "test", json: "app/admin/count-test.json", "title": "тестів"},
            {name: "user", json: "app/admin/count-user.json", "title": "користувачів"}
        ])

})();