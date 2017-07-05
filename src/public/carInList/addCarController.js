(function () {

"use strict";

angular.module('public')
.controller('AddCarController', AddCarController);

AddCarController.$inject = ['carsListService', '$location']
function AddCarController(carsListService, $location) {
  var car = this;
  var newCar = {};
  car.submit = function () {
     newCar = {	
     	'gov_number': car.gov_number, 
     	'car_type': car.car_type, 
     	'gov_number_trailer': car.gov_number_trailer
     }
     carsListService.addNewCar(newCar);
  };
}

})();