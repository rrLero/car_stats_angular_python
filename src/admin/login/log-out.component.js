angular.module('public')
.component('logout', {
	templateUrl: 'src/admin/login/logout.html',
	controller: LogOutController,
});

LogOutController.$inject = ['$cookies', '$state', '$location','CurrentUserService', 'localStorageService'];
function LogOutController($cookies, $state, $location, CurrentUserService, localStorageService) {
	var $ctrl = this;
	$ctrl.logOut = function() {
        localStorageService.remove('token');
	    $location.path('/login'); 
	};
	$ctrl.isAuth = function() {
		return Boolean(CurrentUserService.isAuthenticated())
	}
}
