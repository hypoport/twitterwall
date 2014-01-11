define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'tweetListHolder', 'movingElementsService', '$timeout', '$log',
    function ($scope, $location, $routeParams, tweetListHolder, movingElementsService, $timeout, $log) {

      'use strict';

      $scope.tweetTop = {};
      $scope.tweetBottom = {};
      $scope.tweetTime = 5000;

      function toArray(obj) {
        var array = [];
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length >>> 0; i--;) {
          array[i] = obj[i];
        }
        return array;
      }

      function startAnimationDeferred(srcId, dstId) {
        dstId = dstId || 'tweetBottom';
        srcId = srcId || 'tweetTop';
        $timeout(function () {
          function createBlurTweening(elements) {
            return function () {
              $(elements).css({
                "-webkit-filter": "blur(" + this.blur + "px)",
                "-moz-filter": "blur(" + this.blur + "px)",
                "filter": "blur(" + this.blur + "px)"
              });
            }
          }

          function finalizeTweetAnimation() {
            function hideOldTwitterNameAvatar() {
              $('#' + srcId).find('.tweet-user-avatar').animate({opacity: 0}, 1000, 'swing');
            }

            function showNewTwitterNameAvatar() {
              $('#' + dstId).find('.tweet-user-avatar').animate({opacity: 1}, 1000, 'swing');
            }

            function resetBlurEffectOnSources() {
              $('#' + srcId).find('.letter').css({
                opacity: 0,
                top: 0,
                left: 0,
                "-webkit-filter": "none",
                "-moz-filter": "none",
                "filter": "none"
              });
            }

            function triggerTimerForNextTweet() {
              $timeout(rotateTweets.bind(undefined, dstId, srcId), 2000);
            }

            (function makeAllDstElementsVisible() {
              hideOldTwitterNameAvatar()
              var runOnlyOnceGuard = false;
              // blurring
              $({blur: 5}).animate({blur: 0}, {
                duration: 1000,
                easing: 'swing', // or "linear"
                step: createBlurTweening(dstDelta)
              });
              // fading
              $(dstDelta).animate({opacity: 1}, 1000, 'swing', function () {
                if (!runOnlyOnceGuard) {
                  runOnlyOnceGuard = true;
                  movingElementsService.cleanup();
                  showNewTwitterNameAvatar();
                  resetBlurEffectOnSources();
                  $(dst).css({opacity: 1});
                  triggerTimerForNextTweet();
                }
              });
            })();
          }

          var src = toArray($('#' + srcId).find(".letter"));
          var dst = toArray($('#' + dstId).find(".letter"));
          var dstDelta = toArray(dst);
          var elementMap = [];

          (function findMatchingLettersAndFilterThemOut() {
            for (var i in src) {
              for (var j in dstDelta) {
                if (dstDelta[j] && src[i].textContent == dstDelta[j].textContent) {
                  elementMap.push({src: src[i], dst: dstDelta[j]});
                  delete dstDelta[j];
                  delete src[i];
                  break;
                }
              }
            }
            src = src.filter(function (x) {
              return x != undefined;
            });
          })();

          movingElementsService.addSourceElements(elementMap.map(function (e) {
            return e.src
          }));
          movingElementsService.addDestinationElements(elementMap.map(function (e) {
            return e.dst
          }));
          movingElementsService.prepare();
          movingElementsService.setDoneCallback(finalizeTweetAnimation);

          var runOnlyOnceGuard = false;
          if (src.length) {
            // blurring
            $({blur: 0}).animate({blur: 5}, {
              duration: 1000,
              easing: 'swing', // or "linear"
              step: createBlurTweening(src)
            });
            // fading
            $(src).animate({opacity: 0}, 1000, "swing", function () {
              if (!runOnlyOnceGuard) {
                runOnlyOnceGuard = true;
                movingElementsService.animate();
              }
            });
          } else {
            movingElementsService.animate();
          }
        }, 2000);
      }

      var _listenerRegistered = false;

      if (!_listenerRegistered) {
        _listenerRegistered = true;
        tweetListHolder.registerSearchStartListener(function () {
//          rotateTweets(); --> nice, but will create a leak
        });
      }

      var rotateTweets = function (srcId, dstId) {
        dstId = dstId || "tweetTop";
        srcId = srcId || "tweetBottom";
        var nextTweet = tweetListHolder.getNextTweet();
        var tweetLogMsg = ((nextTweet) ? JSON.stringify({'id': nextTweet.id, 'created_at': nextTweet.created_at, 'text': nextTweet.text}) : 'null');
        $log.debug("SingleTweetController [" + new Date().toUTCString() + "] : nextTweet=" + tweetLogMsg);
        if (nextTweet) {
          $scope[dstId] = nextTweet;
          startAnimationDeferred(srcId, dstId);
        } else {
          $timeout(rotateTweets, 1000);
        }
      }

      $timeout(rotateTweets, 1);

    }
  ]
});
