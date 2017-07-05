(function () {

'use strict';


angular.module('common')
.service('notesListService', notesListService)

notesListService.$inject = ['$http', 'ApiPath', 'token', '$location'];
function notesListService($http, ApiPath, token, $location) {
	var service = this;

	service.getNotesList = function () {
		return $http.get(ApiPath + '/notes' + token).then(function (response) {
			return response.data
		})
	};

	service.removeNote = function (idNote) {
		return $http.delete(ApiPath + '/notes/' + idNote + token)
					.then(function (response) {
						console.log(response.data)
						return response.data
					})			
	};

	service.getOneCarNote = function (carId, date_to, date_from) {
		date_from = date_from || Date.now()/1000-2592000;
		date_to = date_to || Date.now()/1000;
		var config = {};
		config.params = {
			'date_to': date_to,
			'date_from': date_from
			}
		return $http.get(ApiPath + '/notes/' + carId + token, config)
					.then(function (response) {
						return response.data
					})
	};
	service.addNewNote = function (json, carId) {
		return $http.post(ApiPath + '/notes/'+ carId + token, json)
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
		return $http.put(ApiPath + '/notes/' + id + token, json)
					.then(function (response) {
						console.log(response.data);
						$location.url('/notesList')
						return response.data
					})
	};
}


})();