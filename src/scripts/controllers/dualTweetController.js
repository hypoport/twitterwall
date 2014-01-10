define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', '$log', 'tweetListHolder', '$timeout', '$filter',
    function ($scope, $location, $routeParams, $log, tweetListHolder, $timeout, $filter) {
      $scope.tweetTime = 5000;
      $scope.noTweets = true;
      var _secondTweet, _rotator;
      _listenerRegistered = false;

      if (!_listenerRegistered) {
        _listenerRegistered = true;
        if (_rotator) {
          _rotator.stop();
        }
        $log.debug("register SearchStartListener");
        tweetListHolder.registerSearchStartListener(function () {
          $log.debug("dualTweetController SearchListener started");
          $scope.noTweets = true;
          $scope.tweet = null;
          $scope.tweet2 = null;
          _rotator = new _Rotatator();
          _rotator.rotate();
        });
      }

      function _Rotatator() {
        var _enabled = true;

        this.rotate = function () {
          var rotateInternal;
          (rotateInternal = function () {
            if (_enabled) {
              $log.debug("dualTweetController: refresh tweets (" + $filter('date')(new Date(), "hh:mm:ss.sss") + ")");
              _secondTweet = $scope.tweet;
              $scope.tweet = tweetListHolder.getNextTweet();
              if (!_secondTweet) {
                _secondTweet = tweetListHolder.getNextTweet();
              }
              $scope.tweet2 = _secondTweet;
              $scope.noTweets = $scope.tweet == null && $scope.tweet2 == null;
              $timeout(rotateInternal, 5000);
            }
          })();
        };

        this.stop = function () {
          _enabled = false;
        }
      }
    }
  ]
});
