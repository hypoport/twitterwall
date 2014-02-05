define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'tweetListHolder', '$timeout', '$filter', 'logProvider',
    function ($scope, $location, $routeParams, tweetListHolder, $timeout, $filter, logProvider) {
      'use strict';

      $scope.tweet = null;
      $scope.tweet2 = null;
      var _rotator;
      var _listenerRegistered = false;
      this.logger = logProvider.newInstance("dualTweetController");

      this.logger.info("test");

      var _setTweetVisibility = function () {
        $scope.noTweet1 = $scope.tweet == null;
        $scope.noTweet2 = $scope.tweet2 == null;
      }
      _setTweetVisibility();

      if (!_listenerRegistered) {
        _listenerRegistered = true;
        this.logger.debug("register SearchStartListener");
        tweetListHolder.registerSearchStartListener(function () {
          if (_rotator) {
            _rotator.stop();
          }
          this.logger.debug("SearchListener started");
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
            this.logger.debug("refresh tweet1 ");
            $scope.tweet = tweetListHolder.getNextTweet();
            _setTweetVisibility();
            $timeout(_rotateTweet1, _readTime);
          }
        }

        var _rotateTweet2 = function () {
          if (_enabled) {
            this.logger.debug("refresh tweet2");
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
