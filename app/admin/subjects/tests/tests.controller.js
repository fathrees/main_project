(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("TestsController", TestsController);

    TestsController.$inject = ["$stateParams", "testsService"];

    function TestsController($stateParams, testsService) {
        var vm = this;
        vm.test = "jkdfkfdjk";
        vm.headElements = testsService.getHeader();
        activate();

            function activate (){

                testsService.getTests($stateParams.subject_id).then(function(data){
                    vm.list = data;
                    console.log(vm.list);
                });
            };

    }
})();