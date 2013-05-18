angular.module('app').config ['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when '/1',
      templateUrl: '/views/visual1.html'
      controller: 'tweetController'
    .when '/2',
      templateUrl: '/views/visual2.html'
#	.when '/people/:id',
#		controller: 'personDetailsController'
#		reloadOnSearch: true
#		resolve:
#			changeTab: ['$rootScope', ($rootScope) ->
#				$rootScope.$broadcast 'changeTab#people'
#			]
#	.otherwise
#		redirectTo: ''
]