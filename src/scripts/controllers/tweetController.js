define({
  type: 'controller',
  definition: [
    '$scope', '$location', '$routeParams', 'twitterSearchService', 'twitterwallModelHolder', function ($scope, $location, $routeParams, twitterSearchService, twitterwallModelHolder) {
      $scope.tweet = [];

      var tweets = [];

      var rotateTweets = function () {
        $scope.tweet = tweets[0];
      }

      twitterSearchService.start("test", function (result) {
        tweets = result;
        rotateTweets();
      });

      twitterSearchService.stop();
    }
  ]
});
