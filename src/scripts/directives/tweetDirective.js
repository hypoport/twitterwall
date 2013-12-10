define({
  type: 'directive',
  definition: [
    function () {
      return {
        restrict: 'E',
        scope: {
          tweetData: '=data'
        },
        templateUrl: 'views/tweet.html'
      };
    }]
});