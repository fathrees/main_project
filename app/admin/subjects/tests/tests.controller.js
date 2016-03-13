(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestsController", TestsController);

    TestsController.$inject = ["$stateParams", "testsService"];

    function TestsController($stateParams, testsService) {
        var vm = this;
        vm.headElements = testsService.getHeader();

        activate();

        function activate () {
            console.log("activate");
            testsService.getTests().then(function (data){
                console.log(data);
            })
        }

    }
})();