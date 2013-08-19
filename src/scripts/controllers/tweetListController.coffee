define(type: 'controller', definition: [
  '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder'
  ($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder) ->
    $scope.tweets = []
    $scope.tweetLimit = 7;

    addNewTweet = (tweet) ->
      $scope.tweets.unshift(tweet)
      $scope.tweets = $scope.tweets.slice(0, $scope.tweetLimit)

    twitterwallModelHolder.onSearchValueChanged (newSearchValue) ->
      $location.path ('/3/' + newSearchValue)
      return

    twitterwallModelHolder.onSearchValueChanged (newSearchValue) ->
      if newSearchValue && newSearchValue.length > 0
        twitterSearchService.start(newSearchValue, (tweets) ->
          for tweet in tweets
            addNewTweet(tweet)
          return
        )
        return
      return

    if $routeParams.query && $routeParams.query.length > 0
      twitterwallModelHolder.setSearchValue($routeParams.query)
      return

    return @
])