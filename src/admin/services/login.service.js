(function() {
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
      'password': password,
    };

    return $http.post(ApiPath + '/get_token', params).then(function(response) {
      return response.data.token;
    });
  };
  service.getToken = function () {
    var token = $cookies.get('token')
    return token
  }
}


})();
