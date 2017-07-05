(function () {

'use strict';

angular.module('public')
.controller('EditNoteController', EditNoteController)

EditNoteController.$inject = ['notesListService', 'notes', 'id', 'cars']
function EditNoteController(notesListService, notes, id, cars) {
	var note = this;
	var updatedNote;
	notes=notes.notes.filter(function (elem) {
		return elem.id == id
	})[0];
	note.cars = notesListService.arrayModify(cars, notes.car.id);	
	note.date = new Date(notes.date);
	note.car = note.cars[0];
	note.km = notes.km;
	note.pays = notes.pays;
	note.works = notes.works;

	note.submit = function () {
		updatedNote = {
		'km': note.km, 
		'date': note.date.getTime()/1000,         
        'works': note.works, 
        'pays': note.pays
		 };
		 notesListService.editNote(updatedNote, id);
	};

}
})();