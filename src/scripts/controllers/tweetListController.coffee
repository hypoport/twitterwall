angular.module('app').controller 'tweetListController', ['$scope', '$routeParams', 'twitterSearchService', ($scope, $routeParams, twitterSearchService) ->

  $scope.tweets = []
  $scope.tweetLimit = 37;

  # query-string ermitteln

  twitterSearchService.start $routeParams.query, (tweets) ->
    for tweet in tweets
      addNewTweet(tweet)

  addNewTweet = (tweet) ->
    if ($scope.tweets.length >= $scope.tweetLimit)
      $scope.tweets = $scope.tweets.slice(1)
    $scope.tweets.push(tweet)
]