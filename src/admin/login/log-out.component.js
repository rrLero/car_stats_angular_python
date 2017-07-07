(function () {

'use strict';

angular.module('public')
.component('logout', {
	templateUrl: 'src/admin/login/logout.html',
	controller: LogOutController,
});

LogOutController.$inject = ['$cookies', '$state', '$location','CurrentUserService'];
function LogOutController($cookies, $state, $location, CurrentUserService) {
	var $ctrl = this;
	$ctrl.logOut = function () {
		$cookies.remove('token');
	    $location.path('/login'); 
	}
	$ctrl.isAuth = function () {
		return Boolean(CurrentUserService.isAuthenticated())
	}
}
})();