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

      twitterSearchService.start("test", function (result) {
        currentTweet = 0;
        tweets = result;
        rotateTweets();
      });

      twitterSearchService.stop();
    }
  ]
});
