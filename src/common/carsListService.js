(function () {

'use strict';

angular.module('common')
.service('carsListService', carsListService);


carsListService.$inject = ['$http', 'ApiPath', 'token', '$location'];
function carsListService($http, ApiPath, token, $location) {
	var service = this;

	service.getCarsList = function () {
		return $http.get(ApiPath + '/car' + token).then(function (response) {
			return response.data
		})
	};

	service.removeCar = function (idCar) {
		return $http.delete(ApiPath + '/car/' + idCar + token)
					.then(function (response) {
						console.log(response.data)
						return response.data
					})
	};
	service.addNewCar = function (json) {
		return $http.post(ApiPath + '/car' + token, json)
					.then(function (response) {
						console.log(response.data)
						$location.url('/carsList')
						return response.data
					})
	};
	service.editCar = function (json, id) {
		return $http.put(ApiPath + '/car/'+ id + token, json)
					.then(function (response) {
						console.log(response.data)
						$location.url('/carsList')
						return response.data
					})
	};
}

})();