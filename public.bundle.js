/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 111);
/******/ })
/************************************************************************/
/******/ ({

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(112);
__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(115);

__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(118);

__webpack_require__(119);
__webpack_require__(120);
__webpack_require__(121);

__webpack_require__(122);
__webpack_require__(123);
__webpack_require__(124);
__webpack_require__(125);

__webpack_require__(126);
__webpack_require__(127);
__webpack_require__(128);

__webpack_require__(129);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(133);

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

module.exports = (function() {
"use strict";

/**
 * Restaurant module that includes the public module as a dependency
 */
angular.module('carStats', ['public'])
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
}

})();

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

module.exports = (function() {
"use strict";
/**
 * Public carStats application. Includes the common module and ui-router.
 */
angular.module('public', ['ui.router', 'common', 'ngCookies'])
.run(run);

run.$inject = ['$rootScope', 'AuthRedirectorService']
function run($rootScope, AuthRedirectorService) {
  // Apply auth rules when state changes
  $rootScope.$on('$stateChangeStart', AuthRedirectorService.onStateChangeStart);
}
})();

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('common', [])
.config(config)
.constant('ApiPath', 'https://floating-scrubland-23282.herokuapp.com');

config.$inject = ['$httpProvider'];
function config($httpProvider) {
	$httpProvider.interceptors.push('loadingHttpInterceptor');
}
})();

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html',     
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.carsList', {
      url: '/carsList',
      templateUrl: 'src/public/carInList/car-in-list.html',
      controller: 'CarsController',
      controllerAs: 'carsCtrl',
    })
    .state('public.notesList', {
      url: '/notesList',
      templateUrl: 'src/public/noteInList/note-in-list.html',
      controller: 'NotesController',
      controllerAs: 'notesCtrl',
    })
    .state('public.oneCarNotes', {
      url: '/carsList/{id}/notes',
      templateUrl: 'src/public/noteInList/one-car-note.html',
      controller: "OneCarNoteController",
      controllerAs: 'noteCtrl',
      resolve: {
        notes: ['notesListService', '$stateParams', function (notesListService, $stateParams) {
          return notesListService.getOneCarNote($stateParams.id)
        }],
        cars: ['carsListService', '$stateParams', function (carsListService, $stateParams) {
          return carsListService.getCarsList()
        }],
        id: ['$stateParams', function ($stateParams) {
          return $stateParams.id
        }]
      }
    })
    .state('public.addCar', {
      url: '/addCar',
      templateUrl: 'src/public/carInList/addCar.html',
      controller: 'AddCarController',
      controllerAs: 'car',
    })
    .state('public.addNotes', {
      url: '/addNote',
      templateUrl: 'src/public/noteInList/addNote.html',
      controller: 'AddNoteController',
      controllerAs: 'note',
      resolve: {
        cars: ['carsListService', function (carsListService) {
          return carsListService.getCarsList()
        }]
      }
    })
    .state('public.editCar', {
      url: '/editCar/{id}',
      templateUrl: 'src/public/carInList/editCar.html',
      controller: 'EditCarController',
      controllerAs: 'car',
      resolve: {
        cars: ['carsListService', function (carsListService) {
          return carsListService.getCarsList()
        }],
        id: ['$stateParams', function ($stateParams) {
          return $stateParams.id
        }]
      }
    })
    .state('public.editNotes', {
      url: '/editNotes/{id}',
      templateUrl: 'src/public/noteInList/editNotes.html',
      controller: 'EditNoteController',
      controllerAs: 'note',
      resolve: {
        notes: ['notesListService', function (notesListService) {
          return notesListService.getNotesList()
        }],
        id: ['$stateParams', function ($stateParams) {
          return $stateParams.id
        }],
        cars: ['carsListService', function (carsListService) {
          return carsListService.getCarsList()
        }]
      }      
    })
    .state('public.login', {
      url: '/login',
      templateUrl: 'src/admin/login/login.html',
      controller: 'LoginController',
      controllerAs: '$ctrl',
    })
}
})();

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('public')
.controller('LoginController', LoginController);

LoginController.$inject = ['$state', 'LoginService', 'CurrentUserService', '$rootScope', '$cookies'];
function LoginController($state, LoginService, CurrentUserService, $rootScope, $cookies) {
  var $ctrl = this;
  $ctrl.username = '';
  $ctrl.password = '';
  $ctrl.error = '';
  $ctrl.message = '';

  /**
   * Handles when user clicks the login button.
   */
  $ctrl.login = function() {
    LoginService.getAccessToken($ctrl.username, $ctrl.password).then(function(accessToken) {
          // If user went directly to login page, redirect to admin home
      if(!$state.params || !$state.params.toState) {
        var now = new Date();
        now.setDate(now.getDate()+7);
        $cookies.put('token', accessToken, [{expires:now, path: '/'}]);
        $state.go('public.home');
      }
      else {
        $state.go($state.params.toState.name, $state.params.toParams);
      }
    }, function(response) {
      // Login failed
      $ctrl.error = response.data.message;
    });
  };


  $ctrl.valid = function() {
    return ($ctrl.username !== '' && $ctrl.password !== '');
  };

  $ctrl.createUser = function() {
    LoginService.createUser($ctrl.username, $ctrl.password)
                .then(function(response) {
                  $ctrl.message = response;
                })
  }
}
})();

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('public')
.component('logout', {
	templateUrl: 'src/admin/login/logout.html',
	controller: LogOutController,
});

LogOutController.$inject = ['$cookies', '$state', '$location','CurrentUserService'];
function LogOutController($cookies, $state, $location, CurrentUserService) {
	var $ctrl = this;
	$ctrl.logOut = function() {
		$cookies.remove('token');
	    $location.path('/login'); 
	}
	$ctrl.isAuth = function() {
		return Boolean(CurrentUserService.isAuthenticated())
	}
}
})();

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('public')
.service('CurrentUserService', CurrentUserService);

/**
 * Used to store and track information about the currently logged in user.
 * This is intended to be injected any time we need some user metadata
 * or to find out if the user is authenticated.
 **/
function CurrentUserService() {
  var service = this;
  var _username = '';
  var _accessToken = '';

  /**
   * Load the current user with username and token
   */
  service.saveToken = function(username, token) {
    _username = username;
    _accessToken = token;
  };


  service.getUsername = function() {
    return _username;
  };


  service.getAccessToken = function() {
    return _accessToken;
  };


  service.isAuthenticated = function() {
    return _accessToken !== '';
  };
}
})();

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

module.exports = (function() {
"use strict";

//Create a http interceptor factory
function accessTokenHttpInterceptor($cookies) {
    return {
        //For each request the interceptor will set the bearer token header.
        request: function($config) {
            //Fetch token from cookie
            var token=$cookies.get('token');
            //set authorization header
            if (!$config.params) {
                $config.params = {'token': token}
            } else {
               $config.params.token=token; 
            }
            
            return $config;
        },
        response: function(response) {
            //if you get a token back in your response you can use 
            //the response interceptor to update the token in the 
            //stored in the cookie
            if (response.data.token) {
                  //fetch token
                  var token=response.data.token;
                  //set token
                  $cookies.put('token', token);
            }
            return response;
        }
    };
}
accessTokenHttpInterceptor.$inject=['$cookies'];

//Register the http interceptor to angular config.
function httpInterceptorRegistry($httpProvider) {
    $httpProvider.interceptors.push('accessTokenHttpInterceptor');
}
httpInterceptorRegistry.$inject=['$httpProvider'];

//Assign to module
angular
    .module('common')
    .config(httpInterceptorRegistry)
    .factory('accessTokenHttpInterceptor', accessTokenHttpInterceptor)

})();


/***/ }),

/***/ 120:
/***/ (function(module, exports) {

module.exports = (function() {
"use strict";

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  var loadingCount = 0;
  var loadingEventName = 'spinner:activate';

  return {
    request: function (config) {

      if (++loadingCount === 1) {
        $rootScope.$broadcast(loadingEventName, {on: true});
      }

      return config;
    },

    response: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return $q.reject(response);
    }
  };
}

})();


/***/ }),

/***/ 121:
/***/ (function(module, exports) {

module.exports = (function () {
"use strict";

angular.module('common')
.component('loading', {
	template: '<img src="images/spinner.svg" ng-if="$ctrl.show">',
	controller: LoadingController
});

LoadingController.$inject = ['$rootScope'];
function LoadingController($rootScope) {
	var $ctrl = this;
	var listener;

	$ctrl.$onInit = function () {
		$ctrl.show = false;
		listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
	};

	$ctrl.onDestroy = function () {
		listener();
	};

	function onSpinnerActivate(event, data) {
		$ctrl.show = data.on;
	}
}
})();

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

module.exports = (function () {

'use strict';

angular.module('public')
.controller('NotesController', NotesController);

NotesController.$inject = ['notesListService'];
function NotesController(notesListService, title) {
	var $ctrl = this;	

	notesListService.getNotesList().then(function (response) {
		$ctrl.notes = response;
	});

	$ctrl.onRemove = function (idNote, index) {
		var result = confirm('Are You Sure All Data Will Be Erased');
		if (result) {
			notesListService.removeNote(idNote);
		$ctrl.notes.notes.splice(index, 1)
		}		
	};
	$ctrl.editNote = function (note) {
		notesListService.sendNoteToEditView(note)
	};
	$ctrl.reFormat = function (date) {	
		var date2 = new Date();
		var dif = date2.getTimezoneOffset()*60;
		date2 = Date.parse(date) + dif;
		return new Date(date2)
	}
}

})();

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

module.exports = (function () {

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
	};
	$ctrl.reFormat = function (date) {	
		var date2 = new Date();
		var dif = date2.getTimezoneOffset()*60;
		date2 = Date.parse(date) + dif;
		return new Date(date2)
	}
}

})();

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

module.exports = (function () {

'use strict';

angular.module('public')
.controller('EditNoteController', EditNoteController)

EditNoteController.$inject = ['notesListService', 'notes', 'id', 'cars']
function EditNoteController(notesListService, notes, id, cars) {
	var note = this;
	var updatedNote;
	var dif = (new Date).getTimezoneOffset()*60;
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
		note.date.setHours(12,0,0,0);
		updatedNote = {
		'km': note.km, 
		'date': note.date.getTime()/1000-dif,         
        'works': note.works, 
        'pays': note.pays
		 };
		 notesListService.editNote(updatedNote, id);
	};

}
})();

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

module.exports = (function () {

"use strict";

angular.module('public')
.controller('AddNoteController', AddNoteController);

AddNoteController.$inject = ['notesListService', '$location', 'cars']
function AddNoteController(notesListService, $location, cars) {
  var dif = (new Date).getTimezoneOffset()*60;
  var note = this;  
  var newNote = {};
  note.car_type = cars;
  note.date = new Date();  
  note.submit = function () {
     note.date.setHours(12,0,0,0);
     newNote = {
        'date': note.date.getTime()/1000-dif, 
        'km': note.km, 
        'works': note.works, 
        'pays': note.pays || null
      };
     notesListService.addNewNote(newNote, note.car);
  };
}
})();

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

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
})();

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('public')
.controller('EditCarController', EditCarController);

EditCarController.$inject = ['carsListService', 'cars', 'id'];
function EditCarController(carsListService, cars, id) {
	var car = this;
	var updatedCar;
	cars = cars.filter(function(elem) {
		return elem.id == id
		});
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
})();

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

module.exports = (function() {
'use strict';

angular.module('public')
.controller('AddCarController', AddCarController);

AddCarController.$inject = ['carsListService', '$location'];
function AddCarController(carsListService, $location) {
  var car = this;
  var newCar = {};
  car.submit = function() {
     newCar = {	
     	'gov_number': car.gov_number, 
     	'car_type': car.car_type, 
     	'gov_number_trailer': car.gov_number_trailer
     };
     carsListService.addNewCar(newCar);
  };
}
})();

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

module.exports = (function () {

'use strict';


angular.module('common')
.service('notesListService', notesListService);

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
						console.log(response.data.message);
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
			};
		return $http.get(ApiPath + '/notes/' + carId, config)
					.then(function (response) {
						return response.data
					})
	};
	service.addNewNote = function (json, carId) {
		return $http.post(ApiPath + '/notes/'+ carId, json)
					.then(function (response) {
						console.log(response.data.message);
						$location.url('/notesList');
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
						console.log(response.data.message);
						$location.url('/notesList');
						return response.data
					})
	};
}
})();

/***/ }),

/***/ 130:
/***/ (function(module, exports) {

module.exports = (function() {
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
						$log.log(response.data.message);
						return response.data
					})
	};
	service.addNewCar = function(json) {
		return $http.post(ApiPath + '/car', json)
					.then(function(response) {
						$log.log(response.data.message);
						$location.url('/carsList');
						return response.data
					})
	};
	service.editCar = function(json, id) {
		return $http.put(ApiPath + '/car/'+ id, json)
					.then(function(response) {
						$log.log(response.data.message);
						$location.url('/carsList');
						return response.data
					})
	};
}
})();

/***/ }),

/***/ 131:
/***/ (function(module, exports) {

module.exports = (function() {
"use strict";

angular.module('public')
.service('LoginService', LoginService);

LoginService.$inject = ['$http', 'ApiPath', '$rootScope', '$cookies', '$state'];
function LoginService($http, ApiPath, $rootScope, $cookies, $state) {
  var service = this;
  /** Retrieves an access token using a username and password */
  service.getAccessToken = function(username, password) {
    var params = {
      'user_name': username,
      'password': password
    };

    return $http.post(ApiPath + '/get_token', params).then(function(response) {
      return response.data.token;
    });
  };
  service.getToken = function () {
    var token = $cookies.get('token');
    return token
  };
  service.createUser = function (username, password) {
    var params = {
      'user_name': username,
      'password': password
    };
    return $http.post(ApiPath + '/user', params)
                .then(function (response) {
                  return response.data.message
                }, function (resolve) {
                  return resolve.data.message;
                });
  }
}
})();


/***/ }),

/***/ 132:
/***/ (function(module, exports) {

module.exports = (function() {
"use strict";

angular.module('public')
.service('CurrentUserService', CurrentUserService);

/**
 * Used to store and track information about the currently logged in user.
 * This is intended to be injected any time we need some user metadata
 * or to find out if the user is authenticated.
 **/
CurrentUserService.$inject=['$cookies'];
function CurrentUserService($cookies) {
  var service = this;
  var _username = '';
  var _accessToken = '';

  /**
   * Load the current user with username and token
   */

  service.isAuthenticated = function() {
    _accessToken = $cookies.get('token');
    return _accessToken;
  };
}
})();


/***/ }),

/***/ 133:
/***/ (function(module, exports) {

module.exports = (function () {
"use strict";

angular.module('public')
.service('AuthRedirectorService', AuthRedirectorService);


AuthRedirectorService.$inject = ['$state', 'CurrentUserService'];
function AuthRedirectorService($state, CurrentUserService) {
  var service = this;

  /**
   * Processes the logic when a state begins. We ensure that
   * the user is authenticated before letting them proceed
   * to the next page.
   */
  service.onStateChangeStart = function(event, toState, toParams, fromState, fromParams) {
    // Only redirect if going to any admin state,
    // unless going directly to login
    if (toState.name.indexOf('public.') === 0 &&
        toState.name != 'public.login' &&
        !CurrentUserService.isAuthenticated()) {
      event.preventDefault();
      $state.go('public.login', {
        'toState': toState,
        'toParams': toParams
      });
    }
  };

}
})();


/***/ })

/******/ });
//# sourceMappingURL=public.bundle.js.map