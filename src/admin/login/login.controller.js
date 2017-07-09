(function() {
'use strict';

angular.module('public')
.controller('LoginController', LoginController)

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