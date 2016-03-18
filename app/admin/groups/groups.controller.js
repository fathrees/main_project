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
        /////////////////////////////////////////////////
        vm.associativeFaculty = groupsService.gFaculties; // move this to facultiess
        vm.associativeSpeciality = groupsService.gSpecialities; //move to spec.
        activate();

        vm.checkForError = function() {
            if(document.getElementById('table')) {vm.showError = document.getElementById('table').children.length == 1;}
        };

        //gets all the groups from backend
        function activate() {
            groupsService.getGroups().then(function(data) {
                vm.list = data;
            })
        }

        // to sort data on view
        vm.selectedFaculty = null;
        vm.selectedSpeciality = null;
        vm.facultyFilter = function(group) {
            vm.checkForError();
            return vm.selectedFaculty == null || vm.associativeFaculty[group.faculty_id] == vm.selectedFaculty;
        };
        vm.specialityFilter = function(group) {
            vm.checkForError();
            return vm.selectedSpeciality == null || vm.associativeSpeciality[group.speciality_id] == vm.selectedSpeciality;
        };
        vm.filterUndefined = function(entity) {
            return entity !== undefined;
        }
        ///////////////////////////////////////////////////////////////////

        // delete
        vm.removeGroup = function(group) {
            var ask = confirm('Ви впевнені, що бажаєте видалити групу ' + group.group_name + '?');
            if (ask) {
                groupsService.removeGroup(group.group_id).then(function(data) {
                    data.response.indexOf('error') !== -1 ? alert('Не можна видалити групу, в якій є студенти') : console.log('Групу успішно видалено')
                    activate();
                })
            }
        }
        // edit
        vm.toggleEdit = function(group) { // shows form for editing and fills the fields with initial values
            if(group !== undefined) {
                vm.editName = group.group_name;
                vm.editedGroupId = group.group_id;
                vm.editFaculty = vm.associativeFaculty[group.faculty_id];
                vm.editSpeciality = vm.associativeSpeciality[group.speciality_id];
            }
            vm.showEditPanel = !vm.showEditPanel;
        };
        vm.editGroup = function(g_name, f_name, s_name) {
            var group_id = vm.editedGroupId;
            var editing = {
                group_name: g_name,
                faculty_id: vm.associativeFaculty.indexOf(f_name),
                speciality_id: vm.associativeSpeciality.indexOf(s_name)
            };
            groupsService.editGroup(group_id, editing).then(function(data) {
                console.log("Дані про групу успішно змінено");
                activate();
            })
            vm.toggleEdit();
        };
        //add
        vm.addGroup = function(g_name, f_name, s_name) {
            vm.newGroup = '';
            vm.newGroupFaculty = '';
            vm.newGroupSpeciality = '';
            var editing = {
                group_name: g_name,
                faculty_id: vm.associativeFaculty.indexOf(f_name),
                speciality_id: vm.associativeSpeciality.indexOf(s_name)
            };
            groupsService.addGroup(editing).then(function(data) {
                console.log("Групу додано до бази даних");
                activate();
            })
        }



        //teeeeeeeeeeeeesssssssssssstttttttttttt
        vm.test1 = function() {
            console.log(vm.newGroup);
            //console.log(groupsService.gSpecialities);
            //console.log(vm.list);
            //console.log(vm.selectedFaculty);
            //console.log(document.getElementById('table').children.length);
        }


        vm.toggleAdd = function() {
            vm.showAddPanel = !vm.showAddPanel;
        };

        vm.headers = groupsService.headers;

        vm.allowAdd = function() {
            return !(vm.newGroupFaculty && vm.newGroupSpeciality && vm.newGroup);
        }

    }
})();
