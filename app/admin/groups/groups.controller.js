(function() {
    "use strict";

    angular.module("app.admin.groups")
        .controller("GroupsController", GroupsController);

    GroupsController.$inject = ['groupsService'];

    function GroupsController(groupsService) {

        var vm = this;
        vm.showError = false;
        vm.showAddPanel = false;
        vm.showEditPanel = false;
        vm.editName = null;
        vm.editFaculty = null;
        vm.editSpeciality = null;

        vm.checkForError = function() {
            if(document.getElementById('table')) {vm.showError = document.getElementById('table').children.length == 1;}
        };

        // gets all the groups
        groupsService.getGroups().then(function(result) {
            vm.allGroups = result;
        });

        vm.selectedFaculty = null;
        vm.selectedSpeciality = null;

        vm.facultyFilter = function(group) {
            vm.checkForError();
            return vm.selectedFaculty == null || group.faculty == vm.selectedFaculty;
        };

        vm.specialityFilter = function(group) {
            vm.checkForError();
            return vm.selectedSpeciality == null || group.speciality == vm.selectedSpeciality;
        };

        //CRUD

        vm.removeGroup = function(group) {
            var ask = confirm('Ви впевнені, що бажаєте видалити групу ' + group.group_name + '?');
            if (ask) {vm.allGroups.splice(vm.allGroups.indexOf(group), 1)}
        };

        vm.addGroup = function() {
            vm.allGroups.push({
                group_name: vm.newGroup,
                group_id: Math.floor(Math.random()*543),
                faculty: vm.newGroupFaculty,
                speciality: vm.newGroupSpeciality,
                faculty_id: Math.floor(Math.random()*543),
                speciality_id: Math.floor(Math.random()*543)
            });
            vm.toggleAdd();
        };

        vm.editGroup = function(name, faculty, speciality) {
            vm.allGroups[vm.indexOfEdit] = {
                group_name: name,
                faculty: faculty,
                speciality: speciality
            };
            console.log(vm.allGroups[vm.indexOfEdit]);
            vm.toggleEdit();
        };

        vm.toggleAdd = function() {
            vm.showAddPanel = !vm.showAddPanel;
        };

        vm.toggleEdit = function(group) {
            if(group !== undefined) {
                vm.indexOfEdit = vm.allGroups.indexOf(group);
                vm.editName = group.group_name;
                vm.editFaculty = group.faculty;
                vm.editSpeciality = group.speciality;
            }
            vm.showEditPanel = !vm.showEditPanel;
        };

        vm.headers = groupsService.headers;

        vm.allowAdd = function() {
            return !(vm.newGroupFaculty && vm.newGroupSpeciality && vm.newGroup);
        }

    }
})();
