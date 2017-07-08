(function () {

'use strict';

angular.module('public')
.controller('OneCarNoteController', OneCarNoteController)

OneCarNoteController.$inject = ['notes', 'notesListService', 'cars', 'id'];
function OneCarNoteController(notes, notesListService, cars, id) {
	var $ctrl = this;
	var dif = (new Date).getTimezoneOffset()*60;
	$ctrl.cars = cars.filter(function (car) {
		return car.id == id
	})[0];
	$ctrl.notes = notes;
	$ctrl.date_to = new Date;
	$ctrl.date_from = new Date;
	$ctrl.date_from.setDate($ctrl.date_from.getDate() -30);

	$ctrl.getNotesByDate = function (carId, date_to, date_from) {
		date_to.setHours(23,59,59);
		date_from.setHours(dif/3600, 0, 0, 0);
		notesListService.getOneCarNote(carId, date_to.getTime()/1000-dif, date_from.getTime()/1000+dif)
						.then(function (response) {
							$ctrl.notes=response
						})
	}
	$ctrl.reFormat = function (date) {	
		var date2 = new Date();
		var dif = date2.getTimezoneOffset()*60;
		date2 = Date.parse(date) + dif;
		return new Date(date2)
	}
}

})();