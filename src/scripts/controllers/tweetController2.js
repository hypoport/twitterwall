define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder', '$timeout',
    function ($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder, $timeout) {
      $scope.tweet = [];
      $scope.tweetTime = 5000;

      var tweets, currentTweet;

      var rotateTweets = function () {
        var secTweet = currentTweet;
        var firstTweet = secTweet + 1;
        if (secTweet >= tweets.length) {
          secTweet = currentTweet = 0;
          if (secTweet >= tweets.length) {
            firstTweet = currentTweet = 0;
          }
        }
        ++currentTweet;
        $timeout(rotateTweets, 5000)
        $scope.tweet = tweets[firstTweet];
        $scope.tweet2 = tweets[secTweet];
      }

      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        $location.path('/2/' + newSearchValue);
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
