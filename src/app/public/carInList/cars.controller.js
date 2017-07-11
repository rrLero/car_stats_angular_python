angular.module('public')
.controller('CarsController', CarsController);


CarsController.$inject = ['carsListService', '$log'];
function CarsController(carsListService, $log) {
	
	var $ctrl = this;

	carsListService.getCarsList().then(function(response) {
		$ctrl.car2 = response;	
	});
	
	$ctrl.onRemove2 = function(idCar, index) {
		var result = confirm('Are You Sure All Data Will Be Erased');
		$log.log(result);
		if (result) {
			carsListService.removeCar(idCar);
			$ctrl.car2.splice(index, 1)
		}
	} 
}
