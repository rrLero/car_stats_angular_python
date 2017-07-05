(function () {

'use strict';

angular.module('public')
.controller('NotesController', NotesController)

NotesController.$inject = ['notesListService']
function NotesController(notesListService, title) {
	var $ctrl = this;	

	notesListService.getNotesList().then(function (response) {
		$ctrl.notes = response;
	})

	$ctrl.onRemove = function (idNote, index) {
		var result = confirm('Are You Sure All Data Will Be Erased');
		if (result) {
			notesListService.removeNote(idNote);
		$ctrl.notes.notes.splice(index, 1)
		}		
	};
	$ctrl.editNote = function (note) {
		notesListService.sendNoteToEditView(note)
	}
	$ctrl.reFormat = function (date) {	
		return new Date(date)
	}
}

})();