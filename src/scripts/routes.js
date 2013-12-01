define({
  type: 'config',
  definition: [
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/1', {
        templateUrl: 'views/visual1.html',
        controller: 'tweetController'
      }).when('/2', {
        templateUrl: 'views/visual2.html'
      }).when('/3', {
        templateUrl: 'views/visual3.html',
        controller: 'tweetListController'
      }).when('/3/:query', {
        templateUrl: 'views/visual3.html',
        controller: 'tweetListController'
      });
    }
  ]
});
