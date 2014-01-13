define({
    type: 'controller',
    definition: [
        '$scope', '$location', '$routeParams', '$log', 'tweetListHolder', '$timeout', function ($scope, $location, $routeParams, $log, tweetListHolder, $timeout) {
            $scope.tweets = [];

            rotateTweets = function () {
                var tweet = tweetListHolder.getNextTweet();

                if(tweet) {
                    $log.debug("new tweet : " + tweet.text);
                    $scope.tweets.push(tweet);
                }

                while($scope.tweets.length >= 3) {
                    $scope.tweets.shift();
                }

//                if($scope.tweets.length < 2) {
                    $timeout(rotateTweets, 6000);
//                }
            };
            rotateTweets();
        }
    ]
});
