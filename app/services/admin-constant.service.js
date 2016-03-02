(function() {
    "use strict";

    angular.module("app.admin")
        .constant("urls", [
            {name: "faculty", jsonUrl: "app/admin/count-faculty.json", title: "факультетів"},
            {name: "speciality", jsonUrl: "app/admin/count-speciality.json", title: "спеціальностей"},
            {name: "group", jsonUrl: "app/admin/count-group.json", title: "груп"},
            {name: "student", jsonUrl: "app/admin/count-student.json", title: "студентів"},
            {name: "subject", jsonUrl: "app/admin/count-subject.json", title: "предметів"},
            {name: "test", jsonUrl: "app/admin/count-test.json", title: "тестів"},
            {name: "user", jsonUrl: "app/admin/count-user.json", title: "користувачів"}
        ])

})();