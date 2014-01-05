define({
  type: "service",
  definition: [
    '$log', '$routeParams', '$location', 'twitterSearchService', 'twitterwallModelHolder', function ($log, $routeParams, $location, twitterSearchService, twitterwallModelHolder) {
      var _tweets = [];
      var _maxTweetCount = 30;
      var _currentTweetNumber = 0;
      var _tweetSearchStartListener = []
      var _searching = false;

      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        twitterSearchService.stop();
        this._tweets = [];
//        $log.debug("update location with path: " + '/2/' + newSearchValue);
//        $location.path('/2/' + newSearchValue);
        startSearch();
      });

      addNewTweet = function (tweet) {
        _tweets.unshift(tweet);
        _tweets = _tweets.slice(0, _maxTweetCount);
      };

      fireSearchStartEvent = function () {
        var _i, _len, _ref, listener, error;
        _ref = _tweetSearchStartListener;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listener = _ref[_i];
          try {
            listener();
          } catch (_error) {
            error = _error;
            $log.error(error);
          }
        }
      }

      startRequest = function (newSearchValue) {
        $log.debug("start new search on search value:" + newSearchValue);
        while (this._tweets.length > 0) {
          this._tweets.pop();
        }
        if (newSearchValue && newSearchValue.length > 0) {
          fireSearchStartEvent();
          twitterSearchService.start(newSearchValue, function (tweets) {
            // http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
            if (tweets.length > 0) {
              $log.debug("search results received and inserted: " + tweets.length);
              _currentTweetNumber = 0; // move pointer to first entry
              var tweet, _i, _len;
              for (_i = 0, _len = tweets.length; _i < _len; _i++) {
                tweet = tweets[_i];
                addNewTweet(tweet);
              }
            }
            else {
              $log.debug("no new tweets received");
            }
          });

//          twitterSearchService.stop();
        }
      };

      var startSearch = function () {
        if (twitterwallModelHolder._searchValue && twitterwallModelHolder._searchValue.length > 0) {
          $log.debug("update search value through route parameter");
          startRequest(twitterwallModelHolder._searchValue)
        }
      };

      if ($routeParams.query && $routeParams.query.length > 0) {
        twitterwallModelHolder.setSearchValue($routeParams.query);
      }

      this.getNextTweet = function () {
        if (_currentTweetNumber >= _tweets.length) {
          _currentTweetNumber = 0;
        }
        return _tweets[_currentTweetNumber++];
      }

      this.registerSearchStartListener = function (listener) {
        _tweetSearchStartListener.push(listener);
      }


    }
  ]
})
;