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
