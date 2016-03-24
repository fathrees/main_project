(function() {
    "use strict";

    angular.module("app.admin.groups")
        .controller("StudentsController", StudentsController);

    StudentsController.$inject = ["$stateParams","studentsService", "ENTITY_RANGE_ON_PAGE", "groupsService"];

    function StudentsController($stateParams, studentsService, ENTITY_RANGE_ON_PAGE, groupsService) {
        var vm = this;
        vm.headElements = studentsService.getHeadElements();
        vm.currentRecordsRange = 0;
        vm.entitiesPerPage = ENTITY_RANGE_ON_PAGE;
        vm.maxSize = 3;
        vm.currentPage = 1;
        vm.currentRecordsRange = 0;
        vm.getItemsPerPage = getItemsPerPage;
        vm.group_id = $stateParams.group_id;
        vm.associativeGroups = {};
        
        activate();

        function activate() {
            studentsService.getStudentsByGroupId($stateParams.group_id, vm.currentRecordsRange).then(function (data) {
                //vm.list = data;
                vm.totalList = data;
                getItemsPerPage();
                vm.totalItems = vm.totalList.length;
                if(vm.totalItems > ENTITY_RANGE_ON_PAGE) {
                    vm.showPagination = true;
                }
                else {
                    vm.showPagination = false
                }
            });
        }

        function studentRemover(student) {
            var question = confirm("Ви впевнені, що хочете видалити даного студента?! Вся інформація буде знищена");
            if (question) {
                console.log("ctrl");
                studentsService.removeStudent(student).then(function (result) {
                    activate();
                })
            }
        }
        vm.studentRemover = studentRemover;

        //function showEditForm (index, student) {
        //    vm.editStudentModel= {
        //        student_name : student.student_name,
        //        student_surname : student.student_surname,
        //        plain_password : student.plain_password
        //    };
        //    vm.editForm = !vm.editForm;
        //    vm.editIndex = index;
        //}
        //
        //function editStudent(){
        //    vm.list[vm.editIndex] = vm.editStudentModel;
        //    vm.editStudentModel.group_id = $stateParams.group_id;
        //    vm.editForm = !vm.editForm;
        //}

        function getItemsPerPage() {
            vm.currentRecordsRange = (vm.currentPage - 1) * vm.entitiesPerPage
            var end = vm.currentRecordsRange + vm.entitiesPerPage;
            vm.list = vm.totalList.slice(vm.currentRecordsRange, end);
        }


        groupsService.getGroups().then(function(data) {
            vm.groups = data;
            for (var i = 0; i < vm.groups.length; i++) {
                vm.associativeGroups[+vm.groups[i].group_id] = vm.groups[i].group_name;
            }
        });



    }
})();