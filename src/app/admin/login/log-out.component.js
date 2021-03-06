angular
	.module('public')
    .component('logout', {
        template: require('./logout.html'),
        controller: LogOutController,
    });

LogOutController.$inject = ['$state', '$location', 'CurrentUserService', 'localStorageService'];

function LogOutController($state, $location, CurrentUserService, localStorageService) {
    var $ctrl = this;
    $ctrl.logOut = function() {
        localStorageService.remove('token');
        $location.path('/login');
    };
    $ctrl.isAuth = function() {
        return Boolean(CurrentUserService.isAuthenticated());
    };
}
