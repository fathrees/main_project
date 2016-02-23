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
                url: "/students",
                templateUrl: "app/admin/groups/students/students.html",
                controller: "StudentsController as students"
            })
            .state("admin.results", {
                url: "/results",
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
            .state("admin.subjects", {
                url: "/subjects",
                templateUrl: "app/admin/subjects/subjects.html",
                controller: "SubjectsController as subjects"
            })
            .state("admin.schedules", {
                url: "/schedules",
                templateUrl: "app/admin/subjects/schedules/schedules.html",
                controller: "SchedulesController as schedules"
            })
            .state("admin.tests", {
                url: "/tests",
                templateUrl: "app/admin/subjects/tests/tests.html",
                controller: "TestsController as tests"
            })
            .state("admin.question", {
                url: "/question",
                templateUrl: "app/admin/subjects/tests/question/question.html",
                controller: "QuestionController as question"
            })
            .state("admin.testDetails", {
                url: "/question",
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

