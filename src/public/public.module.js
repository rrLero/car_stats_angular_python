/**
 * Public carStats application. Includes the common module and ui-router.
 */
angular.module('public', ['ui.router', 'common', 'ngCookies'])
.run(run);

run.$inject = ['$rootScope', 'AuthRedirectorService']
function run($rootScope, AuthRedirectorService) {
  // Apply auth rules when state changes
  $rootScope.$on('$stateChangeStart', AuthRedirectorService.onStateChangeStart);
}
