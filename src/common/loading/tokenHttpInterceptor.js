//Create a http interceptor factory
angular.module('common')
.factory('accessTokenHttpInterceptor', accessTokenHttpInterceptor);

accessTokenHttpInterceptor.$inject=['localStorageService'];

function accessTokenHttpInterceptor(localStorageService) {
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
                  localStorageService.set('token', token);
            }
            return response;
        }
    };
}


//Register the http interceptor to angular config.


//Assign to module

