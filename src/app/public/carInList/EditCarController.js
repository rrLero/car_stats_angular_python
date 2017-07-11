angular.module('public')
.controller('EditCarController', EditCarController);

EditCarController.$inject = ['carsListService', 'cars', 'id'];
function EditCarController(carsListService, cars, id) {
	var car = this;
	var updatedCar;
	cars = cars.filter(function(elem) {
		return elem.id == id
		})
	car.gov_number = cars[0].gov_number;
	car.car_type = cars[0].car_type;
	car.gov_number_trailer = cars[0].gov_number_trailer;

	car.submit = function() {
		updatedCar = {
		'gov_number': car.gov_number, 
			'car_type': car.car_type, 
			'gov_number_trailer': car.gov_number_trailer
		 };
		 carsListService.editCar(updatedCar, cars[0].id);
	};
}