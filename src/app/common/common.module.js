angular.module('common', [])
.config(config)
.constant('ApiPath', 'https://floating-scrubland-23282.herokuapp.com');

config.$inject = ['$httpProvider'];
function config($httpProvider) {
	$httpProvider.interceptors.push('loadingHttpInterceptor');
    $httpProvider.interceptors.push('accessTokenHttpInterceptor');
}
