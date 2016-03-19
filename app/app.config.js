(function () {
    "use strict";

    angular.module("app")
        .config(configApp);

    configApp.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configApp($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("auth", {
                url: "/",
                templateUrl: "app/auth/auth.html",
                controller: "AuthController as auth"
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "app/admin/home-admin.html",
                controller: "HomeAdminController as admin"
            })
            .state("admin.admins", {
                url: "/admins",
                templateUrl: "app/admin/admins/admins.html",
                controller: "AdminsController as admins"
            })
            .state("admin.adminDetail", {
                url: "/admins/{admin_Id:int}",
                templateUrl: "app/admin/admins/admin-detail.html",
                controller: "AdminDetailController as detail"
            })
            .state("admin.faculties", {
                url: "/faculties",
                templateUrl: "app/admin/faculties/faculties.html",
                controller: "FacultiesController as faculties"
            })
            .state("admin.groups", {
                url: "/groups",
                templateUrl: "app/admin/groups/groups.html",
                controller: "GroupsController as groups"
            })
            .state("admin.students", {
                url: "/groups/{group_id:int}/students",
                templateUrl: "app/admin/groups/students/students.html",
                controller: "StudentsController as students"
            })
            .state("admin.editStudent", {
                url: "/groups/{group_id:int}/students/{student_Id:int}",
                templateUrl: "app/admin/groups/students/student.html",
                controller: "EditStudentController as student"
            })
            .state("admin.addStudent", {
                url: "/groups/{group_id:int}/students/addStudent",
                templateUrl: "app/admin/groups/students/student.html",
                controller: "AddStudentController as student"
            })
            .state("admin.studentResults", {
                url: "/groups/{group_id:int}/students/{student_Id:int}/results",
                templateUrl: "app/admin/groups/students/results/results.html",
                controller: "ResultsController as results"
            })
            .state("admin.reports", {
                url: "/reports",
                templateUrl: "app/admin/reports/reports.html",
                controller: "ReportsController as reports"
            })
            .state("admin.specialities", {
                url: "/specialities",
                templateUrl: "app/admin/specialities/specialities.html",
                controller: "SpecialitiesController as specialities"
            })
            .state("admin.groupsBySpeciality", {
                url: "/specialities/{speciality_id:int}/groups",
                templateUrl: "app/admin/groups/groups.html",
                controller: "GroupsController as groups"
            })
            .state("admin.subjects", {
                url: "/subjects",
                templateUrl: "app/admin/subjects/subjects.html",
                controller: "SubjectsController as subjects"
            })
            .state("admin.schedules", {
                url: "/subjects/{subject_id:int}/schedules",
                templateUrl: "app/admin/subjects/schedules/schedules.html",
                controller: "SchedulesController as schedules"
            })
            .state("admin.schedule", {
                url: "/subjects/{subject_id:int}/schedules/{schedule_id:int}",
                templateUrl: "app/admin/subjects/schedules/schedule.html",
                controller: "ScheduleController as schedule"
            })
            .state("admin.tests", {
                url: "/subjects/{subject_id:int}/tests",
                templateUrl: "app/admin/subjects/tests/tests.html",
                controller: "TestsController as tests"
            })
            .state("admin.test", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}",
                templateUrl: "app/admin/subjects/tests/test.html",
                controller: "TestController as test"
            })
            .state("admin.question", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}/question/{question_id:int}",
                templateUrl: "app/admin/subjects/tests/question/question.html",
                controller: "QuestionController as question"
            })
            .state("admin.answer", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}/answer/{answer_id:int}",
                templateUrl: "app/admin/subjects/tests/answer/answer.html",
                controller: "AnswerController as answer"
            })
            .state("admin.testDetails", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}/details",
                templateUrl: "app/admin/subjects/tests/test-details/test-details.html",
                controller: "TestDetailsController as testDetails"
            })
            .state("user", {
                url: "/user",
                templateUrl: "app/user/home-user.html",
                controller: "HomeUserController as user"
            })
    }
})();

