(function() {
'use strict';

angular.module('common')
.service('carsListService', carsListService);


carsListService.$inject = ['$http', 'ApiPath', '$location', '$log'];
function carsListService($http, ApiPath, $location, $log) {
	var service = this;

	service.getCarsList = function() {
		return $http.get(ApiPath + '/car').then(function(response) {
			return response.data
		})
	};

	service.removeCar = function(idCar) {
		return $http.delete(ApiPath + '/car/' + idCar)
					.then(function(response) {
						$log.log(response.data)
						return response.data
					})
	};
	service.addNewCar = function(json) {
		return $http.post(ApiPath + '/car', json)
					.then(function(response) {
						$log.log(response.data)
						$location.url('/carsList')
						return response.data
					})
	};
	service.editCar = function(json, id) {
		return $http.put(ApiPath + '/car/'+ id, json)
					.then(function(response) {
						$log.log(response.data)
						$location.url('/carsList')
						return response.data
					})
	};
}
})();