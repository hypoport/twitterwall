define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder', function($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder) {
      var addNewTweet, safeApply;
      $scope.tweets = [];
      $scope.tweetLimit = 7;
      safeApply = function(scope, fn) {
        if (scope.$$phase || scope.$root.$$phase) {
          fn();
        } else {
          scope.$apply(fn);
        }
      };
      addNewTweet = function(tweet) {
        safeApply($scope, function() {
          $scope.tweets.unshift(tweet);
          $scope.tweets = $scope.tweets.slice(0, $scope.tweetLimit);
        });
      };
      twitterwallModelHolder.onSearchValueChanged(function(newSearchValue) {
        $location.path('/3/' + newSearchValue);
      });
      twitterwallModelHolder.onSearchValueChanged(function(newSearchValue) {
        if (newSearchValue && newSearchValue.length > 0) {
          twitterSearchService.start(newSearchValue, function(tweets) {
            var tweet, _i, _len;
            for (_i = 0, _len = tweets.length; _i < _len; _i++) {
              tweet = tweets[_i];
              addNewTweet(tweet);
            }
          });
        }
      });
      if ($routeParams.query && $routeParams.query.length > 0) {
        twitterwallModelHolder.setSearchValue($routeParams.query);
      }
    }
  ]
});
