define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'tweetListHolder', 'movingElementsService', '$timeout', 'logger',
    function ($scope, $location, $routeParams, tweetListHolder, movingElementsService, $timeout, logger) {

      'use strict';

      var _logger = logger.getLogger("singleTweetController");
      _logger.setLogLevel(logger.LogLevel.DEBUG);

      $scope.tweetTop = {};
      $scope.tweetBottom = {};
      $scope.tweetSwitchTime = 8000;
      $scope.isAnimationActive = false;

      function toArray(obj) {
        var array = [];
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length >>> 0; i--;) {
          array[i] = obj[i];
        }
        return array;
      }

      function startAnimationDeferred(srcId, dstId) {
        $scope.isAnimationActive = true;
        $timeout(function () {
          _logger.debug("[" + new Date().toLocaleTimeString() + "] SingleTweetController : startAnimationDeferred-callback START");
          function createBlurTweeningStepFunction(elements) {
            return function () {
              $(elements).css({
                "-webkit-filter": "blur(" + this.blur + "px)",
                "-moz-filter": "blur(" + this.blur + "px)",
                "filter": "blur(" + this.blur + "px)"
              });
            }
          }

          function rocketStartFlying() {
            var chance = ((Math.random() * 8) | 0) + 1; // 1:8 chance, that the rocket will fly -- case Java 8  :-)
            if (chance === 8) {
              var rocketFlyTime = 2000; // from CSS !!!
              $("#rocket").attr("class", "end");
              $timeout(rocketGotoStart, rocketFlyTime);
            }
          }

          function rocketGotoStart() {
            $("#rocket").hide().attr("class", "start");
          }

          function rocketReappear() {
            $("#rocket").show(500);
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

            function resetEffectsOnDestination() {
              $(dst).css({opacity: 1});
            }

            function triggerTimerForNextTweet() {
              _logger.debug("[" + new Date().toLocaleTimeString() + "] SingleTweetController : Animation END, triggerTimerForNextTweet");
              $scope.isAnimationActive = false;
              $timeout(rotateTweets.bind(undefined, dstId, srcId), $scope.tweetSwitchTime);
              $timeout(rocketStartFlying, ($scope.tweetSwitchTime / 4) | 0);
            }

            (function makeAllDstElementsVisible() {
              hideOldTwitterNameAvatar()
              var runOnlyOnceGuard = false;
              // blurring
              $({blur: 5}).animate({blur: 0}, {
                duration: 1000,
                easing: 'swing', // or "linear"
                step: createBlurTweeningStepFunction(dstDelta)
              });
              // fading
              $(dstDelta).animate({opacity: 1}, 1000, 'swing');
              //
              $timeout(function cleanupAndTriggerNextTweet() {
                movingElementsService.cleanup();
                showNewTwitterNameAvatar();
                resetBlurEffectOnSources();
                resetEffectsOnDestination();
                triggerTimerForNextTweet();
              }, 1100);
            })();
          }

          rocketReappear(); // always

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
              step: createBlurTweeningStepFunction(src)
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
        }, 1);
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
        if (nextTweet) {
          var tweetLogMsg = JSON.stringify({'id': nextTweet.id, 'created_at': nextTweet.created_at, 'text': nextTweet.text, 'srcId': srcId, 'dstId': dstId});
          _logger.debug("[" + new Date().toLocaleTimeString() + "] SingleTweetController : nextTweet=" + tweetLogMsg);
          $scope[dstId] = nextTweet;
          startAnimationDeferred(srcId, dstId);
        } else {
          _logger.debug("[" + new Date().toLocaleTimeString() + "] SingleTweetController : nextTweet=undefined");
          $timeout(rotateTweets.bind(undefined, srcId, dstId), 1000);
        }
      }

      $timeout(rotateTweets, 1);

    }
  ]
});
