define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', '$log', 'tweetListHolder', '$timeout',
    function ($scope, $location, $routeParams, $log, tweetListHolder, $timeout) {
      $scope.tweetTime = 5000;
      $scope.noTweets = true;
      var _secondTweet, rotateTweets;
      this._listenerRegistered = false;

      if (!this._listenerRegistered) {
        this._listenerRegistered = true;
        this._rotate = false;
        $log.debug("register SearchStartListener");
        tweetListHolder.registerSearchStartListener(function () {
          $log.debug("dualTweetController SearchListener started");
          $scope.noTweets = true;
          $scope.tweet = null;
          $scope.tweet2 = null;
        });
      }

      (rotateTweets = function () {
        $log.debug("dualTweetController.rotateTweets(): refresh tweets");
        _secondTweet = $scope.tweet;
        $scope.tweet = tweetListHolder.getNextTweet();
        if (!_secondTweet) {
          _secondTweet = tweetListHolder.getNextTweet();
        }
        $scope.tweet2 = _secondTweet;
        $scope.noTweets = $scope.tweet == null && $scope.tweet2 == null;
        $timeout(rotateTweets, 5000);
      })();
    }
  ]
});
