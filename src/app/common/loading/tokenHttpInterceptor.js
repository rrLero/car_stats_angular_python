//Create a http interceptor factory
function accessTokenHttpInterceptor($cookies, localStorageService) {
    return {
        //For each request the interceptor will set the bearer token header.
        request: function($config) {
            //Fetch token from cookie
            var token=localStorageService.get('token');
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
accessTokenHttpInterceptor.$inject=['$cookies', 'localStorageService'];

//Register the http interceptor to angular config.
function httpInterceptorRegistry($httpProvider) {
    $httpProvider.interceptors.push('accessTokenHttpInterceptor');
}
httpInterceptorRegistry.$inject=['$httpProvider'];

//Assign to module
angular
    .module('common')
    .config(httpInterceptorRegistry)
    .factory('accessTokenHttpInterceptor', accessTokenHttpInterceptor);
