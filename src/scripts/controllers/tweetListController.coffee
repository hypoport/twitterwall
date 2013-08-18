define(type: 'controller', definition: [
  '$scope', '$routeParams', 'twitterSearchService',
  ($scope, $routeParams, twitterSearchService) ->
    $scope.tweets = []
    $scope.tweetLimit = 7;

    addNewTweet = (tweet) ->
      $scope.tweets.unshift(tweet)
      $scope.tweets = $scope.tweets.slice(0, $scope.tweetLimit)

    # query-string ermitteln
    $scope.doTwitterSearch = (query) ->
      console.log("doTwitterSearch")

      if ($scope.search != undefined)
        $scope.search.stop();

      $scope.search = twitterSearchService.start(
        query
        (tweets) ->
          console.log("found tweets: " + tweets.length)
          for tweet in tweets
            addNewTweet(tweet)
      )
])