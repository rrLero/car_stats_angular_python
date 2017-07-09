(function () {

"use strict";

angular.module('public')
.controller('AddNoteController', AddNoteController);

AddNoteController.$inject = ['notesListService', '$location', 'cars']
function AddNoteController(notesListService, $location, cars) {
  var dif = (new Date).getTimezoneOffset()*60;
  var note = this;  
  var newNote = {};
  note.car_type = cars;
  note.date = new Date();  
  note.submit = function () {
     note.date.setHours(12,0,0,0);
     newNote = {
        'date': note.date.getTime()/1000-dif, 
        'km': note.km, 
        'works': note.works, 
        'pays': note.pays || null
      }
     notesListService.addNewNote(newNote, note.car);
  };
}
})();