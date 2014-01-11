define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', '$log', 'tweetListHolder', '$timeout', '$filter',
    function ($scope, $location, $routeParams, $log, tweetListHolder, $timeout, $filter) {
      'use strict';

      $scope.tweet == null;
      $scope.tweet2 == null;
      var _rotator;
      var _listenerRegistered = false;

      var _setTweetVisibility = function () {
        $scope.noTweet1 = $scope.tweet == null;
        $scope.noTweet2 = $scope.tweet2 == null;
      }
      _setTweetVisibility();

      if (!_listenerRegistered) {
        _listenerRegistered = true;
        if (_rotator) {
          _rotator.stop();
        }
        $log.debug("register SearchStartListener");
        tweetListHolder.registerSearchStartListener(function () {
          $log.debug("dualTweetController SearchListener started");
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
            $log.debug("dualTweetController: refresh tweet1 (" + $filter('date')(new Date(), "hh:mm:ss.sss") + ")");
            $scope.tweet = tweetListHolder.getNextTweet();
            _setTweetVisibility();
            $timeout(_rotateTweet1, _readTime);
          }
        }

        var _rotateTweet2 = function () {
          if (_enabled) {
            $log.debug("dualTweetController: refresh tweet2 (" + $filter('date')(new Date(), "hh:mm:ss.sss") + ")");
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
