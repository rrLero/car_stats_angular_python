(function() {
"use strict";

angular.module('common', [])
.config(config)
.constant('ApiPath', 'https://floating-scrubland-23282.herokuapp.com')
.constant('token', '?token=IPVeWZlVJlZKNQGqb');

config.$inject = ['$httpProvider'];
function config($httpProvider) {
	$httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();