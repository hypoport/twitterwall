define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder', 'movingElementsService', '$timeout',
    function ($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder, movingElementsService, $timeout) {
      $scope.tweetCurrent = {};
      $scope.tweetNext = {};
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

      function startAnimationDeferred() {
        $timeout(function () {
          var src = toArray(document.getElementsByClassName("tweet-text")[0].getElementsByClassName("letter"));
          var dst = toArray(document.getElementsByClassName("tweet-text")[1].getElementsByClassName("letter"));
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
              $('.tweet-user-avatar:first').animate({opacity: 0}, 1000, "swing");
            }

            function showNewTwitterNameAvatar() {
              $('.tweet-user-avatar:last').animate({opacity: 1}, 1000, "swing");
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
              $(dst).animate({opacity: 1}, 1000, "swing", function () {
                if (!runOnlyOnceGuard) {
                  runOnlyOnceGuard = true;
                  movingElementsService.cleanup();
                  showNewTwitterNameAvatar();
                }
              });
            })();
          }

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
        }, 1);
      }

      var rotateTweets = function () {
        $scope.tweetCurrent = tweets[0];
        $scope.tweetNext = tweets[1];
        startAnimationDeferred();
      }

      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        $location.path('/1/' + newSearchValue);
      });
      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        if (newSearchValue && newSearchValue.length > 0) {
          twitterSearchService.start(newSearchValue, function (result) {
            currentTweet = 0;
            tweets = result;
            rotateTweets();
          });

          twitterSearchService.stop();
        }
      });
      if ($routeParams.query && $routeParams.query.length > 0) {
        twitterwallModelHolder.setSearchValue($routeParams.query);
      }
    }
  ]
});
