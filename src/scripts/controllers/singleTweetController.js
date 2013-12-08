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

      function startAnimationDeferred() {
        $timeout(function () {
          var src = document.getElementsByClassName("singletweet")[0].getElementsByClassName("letter");
          var dst = document.getElementsByClassName("singletweet")[1].getElementsByClassName("letter");
          movingElementsService.addSourceElements(src);
          movingElementsService.addDestinationElements(dst);
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
