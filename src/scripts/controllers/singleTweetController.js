define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'tweetListHolder', 'movingElementsService', '$timeout',
    function ($scope, $location, $routeParams, tweetListHolder, movingElementsService, $timeout) {
      $scope.tweetTop = {};
      $scope.tweetBottom = {};
      $scope.tweetTime = 5000;

      var tweets, currentTweet;

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
              $(src).css({
                opacity: 0,
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
              $(dst).animate({opacity: 1}, 1000, 'swing', function () {
                if (!runOnlyOnceGuard) {
                  runOnlyOnceGuard = true;
                  movingElementsService.cleanup();
                  showNewTwitterNameAvatar();
                  resetBlurEffectOnSources();
                  triggerTimerForNextTweet();
                }
              });
            })();
          }

          var src = toArray($('#' + srcId).find(".letter"));
          var dst = toArray($('#' + dstId).find(".letter"));
          var dstDelta = toArray(dst);

          (function findMatchingLettersAndFilterThemOut() {
            elementMap = [];
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

      _listenerRegistered = false;

      if (!_listenerRegistered) {
        _listenerRegistered = true;
//        _rotate = false;
//        $log.debug("register SearchStartListener");
        tweetListHolder.registerSearchStartListener(function () {
//          $scope.tweetTop = ??;
//          $scope.tweetBottom = ??;
        });
      }

      var rotateTweets = function (srcId, dstId) {
        dstId = dstId || "tweetTop";
        srcId = srcId || "tweetBottom";
        var nextTweet = tweetListHolder.getNextTweet();
        if (nextTweet) {
          $scope[dstId] = nextTweet;
          startAnimationDeferred(srcId, dstId);
        }
        else
          $timeout(rotateTweets, 1000);
      }

      $timeout(rotateTweets, 1);

//      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
//        $location.path('/1/' + newSearchValue);
//      });
//      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
//        if (newSearchValue && newSearchValue.length > 0) {
//          twitterSearchService.start(newSearchValue, function (result) {
//            currentTweet = 0;
//            tweets = result;
//            rotateTweets();
//          });
//
//          twitterSearchService.stop();
//        }
//      });
//      if ($routeParams.query && $routeParams.query.length > 0) {
//        twitterwallModelHolder.setSearchValue($routeParams.query);
//      }
    }
  ]
});
