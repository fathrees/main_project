(function() {
    "use strict";

    angular.module("app.admin.groups")
        .controller("StudentsController", StudentsController);

    StudentsController.$inject = ["$stateParams","studentsService"];

    function StudentsController($stateParams, studentsService) {
        var vm = this;
        vm.editForm = false;
        vm.addForm = false;
        vm.newStudent = {
            "student_surname": "",
            "student_name": "",
            "plain_password": ""
        };
        vm.headElements = studentsService.getHeadElements();

        vm.addNewStudent = addNewStudent;
        vm.removeStudent = removeStudent;
        vm.editStudent = editStudent;
        vm.showAddForm = showAddForm;
        vm.showEditForm = showEditForm;

        studentsService.getStudentsByGroupId("app/admin/groups/students/students.json", $stateParams.group_id).then(
            function(result) {
                vm.list = result;
            },
            function(result){
            });

        function showAddForm () {
            vm.newStudent = {
                "student_surname": "",
                "student_name": "",
                "plain_password": ""
            };
            vm.addForm = !vm.addForm;
        }

        function addNewStudent(){
            vm.newStudent.user_id = vm.list.length +1;
            vm.newStudent.group_id = $stateParams.group_id;
            vm.list.push(vm.newStudent);
            vm.addForm = !vm.addForm;
        }

        function removeStudent(student){
            vm.list.splice(vm.list.indexOf(student), 1);
        }

        function showEditForm (index, student) {
            vm.editStudentModel= {
                student_name : student.student_name,
                student_surname : student.student_surname,
                plain_password : student.plain_password
            };
            vm.editForm = !vm.editForm;
            vm.editIndex = index;
        }

        function editStudent(){
            vm.list[vm.editIndex] = vm.editStudentModel;
            vm.editStudentModel.group_id = $stateParams.group_id;
            vm.editForm = !vm.editForm;
        }

        // todo.
        //
        //list of function I will need in future:
        //groupsService.getStudentsData("app/admin/groups/students/students.json").then(
        //    function(result) {
        //        vm.list = result;
        //    },
        //    function(result){});
        //vm.showError = false;

        //vm.checkForError = function() {
        //    var testNodesNum = document.getElementsByClassName('table').children.length;
        //    if (testNodesNum == 1) {
        //        vm.showError = true;
        //        console.log(vm.showError);
        //    } else {
        //        vm.showError = false;
        //    }
        //};
    }
})();