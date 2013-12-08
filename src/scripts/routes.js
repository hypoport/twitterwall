define({
  type: 'config',
  definition: [
    '$routeProvider', function ($routeProvider) {
      return $routeProvider.when('/1/:query', {
        templateUrl: 'views/visual1.html',
        controller: 'tweetController'
      }).when('/2/:query', {
            templateUrl: 'views/visual2.html',
            controller: 'tweetController2'
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
