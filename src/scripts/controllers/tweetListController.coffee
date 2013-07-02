define(type: 'controller', definition: [
  '$scope', '$routeParams', 'twitterSearchService',
  ($scope, $routeParams, twitterSearchService) ->
    $scope.tweets = []
    $scope.tweetLimit = 7;

    addNewTweet = (tweet) ->
      $scope.tweets.unshift(tweet)
      $scope.tweets = $scope.tweets.slice(0, $scope.tweetLimit)

    showError = (error) ->
      $scope.errors.push(error)

    # query-string ermitteln
    twitterSearchService.start(
      $routeParams.query
      (tweets, error) ->
        if error
          showError(error)
        if tweets
          for tweet in tweets
            addNewTweet(tweet)
    )
])