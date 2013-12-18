define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder', 'movingElementsService', '$timeout',
    function ($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder, movingElementsService, $timeout) {
      $scope.tweetCurrent = {};
      $scope.tweetNext = {};
      $scope.tweetTime = 5000;

      var tweets, currentTweet;

      function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
      }

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
          var src = toArray(document.getElementsByClassName("singletweet")[0].getElementsByClassName("letter"));
          var dst = toArray(document.getElementsByClassName("singletweet")[1].getElementsByClassName("letter"));

          elementMap = [];

          for (var i in src) {
            for (var j in dst) {
              if (dst[j] && src[i].textContent == dst[j].textContent) {
                elementMap.push({src: src[i], dst: dst[j]});
                delete dst[j];
                delete src[i];
                break;
              }
            }
          }

          console.log(elementMap);



          // DEBUG --- todo : wieder einkommentieren
          movingElementsService.addSourceElements(elementMap.map(function (e){return e.src}));
          movingElementsService.addDestinationElements(elementMap.map(function (e){return e.dst}));
          movingElementsService.prepare();
          movingElementsService.animate();
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
