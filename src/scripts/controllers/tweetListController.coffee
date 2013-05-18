angular.module('app').controller 'tweetListController', ['$scope', 'twitterSearchServiceMock', ($scope, twitterSearchServiceMock) ->

  $scope.tweets = []
  $scope.tweetLimit = 4;

  twitterSearchServiceMock.addNewTweetCallback (tweets) ->
    for tweet in tweets
      addNewTweet(tweet)

  addNewTweet = (tweet) ->
    if ($scope.tweets.length >= $scope.tweetLimit)
      $scope.tweets = $scope.tweets.slice(1)
    $scope.tweets.push(tweet)
]