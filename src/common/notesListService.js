(function () {

'use strict';


angular.module('common')
.service('notesListService', notesListService)

notesListService.$inject = ['$http', 'ApiPath', '$location'];
function notesListService($http, ApiPath, $location) {
	var service = this;
	var dif = (new Date).getTimezoneOffset()*60;

	service.getNotesList = function () {
		return $http.get(ApiPath + '/notes').then(function (response) {
			return response.data
		})
	};

	service.removeNote = function (idNote) {
		return $http.delete(ApiPath + '/notes/' + idNote)
					.then(function (response) {
						console.log(response.data)
						return response.data
					})			
	};

	service.getOneCarNote = function (carId, date_to, date_from) {
		date_from = date_from || Date.now()/1000-2592000;
		date_to = date_to || new Date()/1000+86400;
		var config = {};
		config.params = {
			'date_to': date_to,
			'date_from': date_from
			}
		return $http.get(ApiPath + '/notes/' + carId, config)
					.then(function (response) {
						return response.data
					})
	};
	service.addNewNote = function (json, carId) {
		return $http.post(ApiPath + '/notes/'+ carId, json)
					.then(function (response) {
						console.log(response.data);
						$location.url('/notesList')
						return response.data
					})
	};
	service.arrayModify = function (array, id) {
		let index = array.findIndex(function (elem) {
			return elem.id == id
			});
		var element = array.splice(index,1);
		array.unshift(element[0]);	
		return array
	};
	service.editNote = function (json, id) {
		return $http.put(ApiPath + '/notes/' + id, json)
					.then(function (response) {
						console.log(response.data);
						$location.url('/notesList')
						return response.data
					})
	};
}


})();