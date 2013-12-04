define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder', '$timeout',
    function ($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder, $timeout) {
      $scope.tweet = [];
      $scope.tweetTime = 5000;

      var tweets, currentTweet;

      var rotateTweets = function () {
        var nextTweet = currentTweet++;
        if (nextTweet >= tweets.length) {
          nextTweet = currentTweet = 0;
        }
        $timeout(rotateTweets, 5000)
        $scope.tweet = tweets[nextTweet];
      }

      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        $location.path('/1/' + newSearchValue);
      });
      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        if (newSearchValue && newSearchValue.length > 0) {
          twitterSearchService.start(newSearchValue, function (result) {
            currentTweet = 0;
            tweets = result;
            rotateTweets();
          });

          twitterSearchService.stop();
        }
      });
      if ($routeParams.query && $routeParams.query.length > 0) {
        twitterwallModelHolder.setSearchValue($routeParams.query);
      }
    }
  ]
});
