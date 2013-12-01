require.config({
  shim: {
    'angular': {
      deps: [],
      exports: 'angular'
    },
    'angular-loader': {
      deps: ['angular']
    },
    'angular-route': {
      deps: ['angular', 'angular-loader']
    },
    'angular-animate': {
      deps: ['angular', 'angular-loader']
    }
  }
});

require(
   ['app'],
   function (app) {
     return angular.element(document).ready(function () {
       return angular.bootstrap(document, ['app']);
     });
   });
