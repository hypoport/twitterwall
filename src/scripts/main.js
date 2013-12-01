require(['app', 'libs/angular', 'libs/angular-loader', 'libs/angular-route', 'libs/angular-animate'], function(app) {
  return angular.element(document).ready(function() {
    return angular.bootstrap(document, ['app']);
  });
});
