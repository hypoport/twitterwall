angular.module('app').controller 'tweetListController', ['$scope', 'twitterSearchServiceMock', ($scope, twitterSearchServiceMock) ->
  $scope.tweets = []
  twitterSearchServiceMock.addNewTweetCallback (tweets) ->
    for tweet in tweets
      $scope.tweets.push(tweet)
]