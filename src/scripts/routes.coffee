define(type: 'config', definition: [
  '$routeProvider',
  ($routeProvider) ->
    $routeProvider
    .when '/1',
      templateUrl: 'views/visual1.html'
      controller: 'tweetController'
    .when '/2',
      templateUrl: 'views/visual2.html'
    .when '/3/:query',
      templateUrl: 'views/visual3.html'
      controller: 'tweetListController'
])
