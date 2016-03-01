
(function() {
    "use strict";

    var domain = "http://dtapi.local/";

    angular.module("app")
        .constant("URL", {
            LOGIN_URL: domain + "login/index",
            ISLOGGED_URL: domain + "login/isLogged",
            LOGOUT_URL: domain + "login/logout",
        });
})();