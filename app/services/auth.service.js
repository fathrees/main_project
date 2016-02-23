(function() {
    "use strict";

    angular.module("app")
        .factory("authService", authService);

<<<<<<< HEAD
    AuthService.$inject = ["$http", "$state"];

    function AuthService($http, $state) {
        ;
        var authService = {
            session :{
                username:"",
                userRoles:[],
            },
            login: login
        };
        return authService;

        function login(credentials){
            console.log(credentials);
            $http
                .post("http://dtapi.local/login/index", credentials)
                .then(function(res){
                  console.log(res.data.response)
                    if(res.data.response === "ok" && res.data.roles[1] === "admin") {
                        authService.session.username = res.data.username;
                        authService.session.userRoles = res.data.roles;
                        $state.go("admin")
                    }
                    if(res.data.response === "ok" && res.data.roles === " ") {
                        authService.session.username = res.data.username;
                        authService.session.userRoles = res.data.roles;
                        $state.go("user");
                    }
                    else{
                        alert(res.data.response);
                        console
                        console.log(res.data);
                    }
                    })
        }
=======
    authService.$inject = [];

    function authService() {
        var service = {

        };

        return service;
>>>>>>> 22943485f92ba58431a956416cfdd14e101c52e0
    }

})();