define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', '$log', 'tweetListHolder', '$timeout', function ($scope, $location, $routeParams, $log, tweetListHolder, $timeout) {
      'use strict';

      $scope.tweets = [];

      var rotateTweets = function () {
        var tweet = tweetListHolder.getNextTweet();
        if (tweet) {
          $log.debug("new tweet : " + tweet.text);
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
