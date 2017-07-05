(function () {

"use strict";

angular.module('public')
.controller('AddNoteController', AddNoteController);

AddNoteController.$inject = ['notesListService', '$location', 'cars']
function AddNoteController(notesListService, $location, cars) {
  var note = this;  
  var newNote = {};
  note.car_type = cars;
  note.date = new Date();  
  note.submit = function () {
     newNote = {
        'date': note.date.getTime()/1000, 
        'km': note.km, 
        'works': note.works, 
        'pays': note.pays
      }
     notesListService.addNewNote(newNote, note.car);
  };
}
})();