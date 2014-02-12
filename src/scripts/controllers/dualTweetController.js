define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'tweetListHolder', '$timeout', '$filter', 'logger',
    function ($scope, $location, $routeParams, tweetListHolder, $timeout, $filter, logger) {
      'use strict';

      $scope.tweet = null;
      $scope.tweet2 = null;
      var _rotator;
      var _listenerRegistered = false;
      var _logger = logger.getLogger("dualTweetController");
      _logger.setLogLevel(logger.LogLevel.INFO);

      _logger.info("log level is info");

      var _setTweetVisibility = function () {
        $scope.noTweet1 = $scope.tweet == null;
        $scope.noTweet2 = $scope.tweet2 == null;
      }
      _setTweetVisibility();

      if (!_listenerRegistered) {
        _listenerRegistered = true;
        _logger.debug("register SearchStartListener");
        tweetListHolder.registerSearchStartListener(function () {
          if (_rotator) {
            _rotator.stop();
          }
          _logger.debug("SearchListener started");
          $scope.tweet = null;
          $scope.tweet2 = null;
          _setTweetVisibility();
          _rotator = new _Rotatator();
          _rotator.rotate();
        });
      }

      function _Rotatator() {
        var _enabled = true;
        var _readTime = 10000;

        this.rotate = function () {
          var rotateInternal;
          _rotateTweet1();
          $timeout(_rotateTweet2, _readTime / 2);
        };

        var _rotateTweet1 = function () {
          if (_enabled) {
            _logger.debug("refresh tweet1 ");
            $scope.tweet = tweetListHolder.getNextTweet();
            _setTweetVisibility();
            $timeout(_rotateTweet1, _readTime);
          }
        }

        var _rotateTweet2 = function () {
          if (_enabled) {
            _logger.debug("refresh tweet2");
            $scope.tweet2 = tweetListHolder.getNextTweet();
            _setTweetVisibility();
            $timeout(_rotateTweet2, _readTime);
          }
        }

        this.stop = function () {
          _enabled = false;
        }
      }
    }
  ]
});
