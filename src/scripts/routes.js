define({
  type: 'config',
  definition: [
    '$routeProvider', function ($routeProvider) {
      return $routeProvider
          .when('/1/:query', {
            templateUrl: 'views/visual1.html',
            controller: 'singleTweetController'
          })
          .when('/2/:query', {
            templateUrl: 'views/visual2.html',
            controller: 'dualTweetController'
          })
          .when('/3', {
            templateUrl: 'views/visual3.html',
            controller: 'tweetListController'
          })
          .when('/3/:query', {
            templateUrl: 'views/visual3.html',
            controller: 'tweetListController'
          })
          .otherwise({
            redirectTo: '/1'
          });
    }
  ]
});
