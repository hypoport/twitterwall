define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'logger', 'tweetListHolder', '$timeout', function ($scope, $location, $routeParams, logger, tweetListHolder, $timeout) {
      'use strict';

      var _logger = logger.getLogger("singleTweetController");
      _logger.setLogLevel(logger.LogLevel.DEBUG);

      $scope.tweets = [];

      var rotateTweets = function () {
        var tweet = tweetListHolder.getNextTweet();
        if (tweet) {
          _logger.debug("new tweet : " + tweet.text);
          $scope.tweets.push(tweet);
          $timeout(rotateTweets, 10000);
        } else {
          $timeout(rotateTweets, 1000);

        }

        while ($scope.tweets.length >= 3) {
          $scope.tweets.shift();
        }
      };

      $timeout(rotateTweets, 1000);
    }
  ]
});
