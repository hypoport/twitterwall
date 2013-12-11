define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', '$log', 'twitterSearchService', 'twitterwallModelHolder', '$timeout',
    function ($scope, $location, $routeParams, $log, twitterSearchService, twitterwallModelHolder, $timeout) {
      $scope.tweet = [];
      $scope.tweetTime = 5000;
      $scope.noTweets = true;

      var tweets = [];
      var currentTweet = 0;

      var rotateTweets = function () {
        if (tweets.length == 0) {
          return;
        }
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
        $log.debug("dualTweetController.rotateTweets(): refresh tweets");
        $scope.tweet = tweets[firstTweet];
        $scope.tweet2 = tweets[secTweet];
      }

      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        tweets = []; // model reset here stops the thread, otherwise the rotation continues and stops after next reload
        $log.debug("update location with path: " + '/2/' + newSearchValue);
        $location.path('/2/' + newSearchValue);
      });

      var startRequest = function (newSearchValue) {
        $log.debug("start new search on search value:" + newSearchValue);
        if (newSearchValue && newSearchValue.length > 0) {
          twitterSearchService.start(newSearchValue, function (result) {
            $log.debug("search results received: " + result.toString());
            currentTweet = 0;
            tweets = result;
            $scope.noTweets = tweets.length == 0;
            rotateTweets();
          });

          twitterSearchService.stop();
        }
      };

      if ($routeParams.query && $routeParams.query.length > 0) {
        $log.debug("update search value through route parameter");
        twitterwallModelHolder.setSearchValue($routeParams.query);
        startRequest(twitterwallModelHolder._searchValue)
      }
    }
  ]
});
