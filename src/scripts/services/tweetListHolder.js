define({
  type: "service",
  definition: [
    '$log', '$routeParams', '$location', 'twitterSearchService', 'twitterwallModelHolder',
    function ($log, $routeParams, $location, twitterSearchService, twitterwallModelHolder) {
      var _tweets = new Array();
      var _maxTweetCount = 30;
      var _currentTweetNumber = 0;
      var _tweetSearchStartListener = []
      var _activeSearchService;
      var _searchWasStarted = false;

      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        if (_activeSearchService) {
          _activeSearchService.stop();
        }
        _tweets = new Array();
        // [Daniel Ranke]: Update path, seams to create a new controller instance that registered another tweetSearchListener
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
        _searchWasStarted = true;
      }

      startRequest = function (newSearchValue) {
        $log.debug("tweets before dropping: " + _tweets.length);
        $log.debug("start new search on search value:" + newSearchValue);
        while (_tweets.length > 0) {
          _tweets.pop();
        }
        $log.debug("tweets before search: " + _tweets.length);

        if (newSearchValue && newSearchValue.length > 0) {
          _activeSearchService = twitterSearchService.provideNewService();
          $log.debug("activeSearchService" + _activeSearchService);
          _activeSearchService.start(newSearchValue, function (tweets) {
                // http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
                if (tweets.length > 0) {
                  $log.debug("search results received and inserted: " + tweets.length);
                  _currentTweetNumber = 0; // move pointer to first entry
                  var tweet, _i, _len;
                  for (_i = 0, _len = tweets.length; _i < _len; _i++) {
                    tweet = tweets[_i];
                    addNewTweet(tweet);
                  }
                  $log.debug("current tweet length: " + _tweets.length);
                  if (!_searchWasStarted) {
                    fireSearchStartEvent();
                  }
                }
                else {
                  $log.debug("no new tweets received");
                }
              }
          );

        }
      };

      var startSearch = function () {
        if (twitterwallModelHolder._searchValue && twitterwallModelHolder._searchValue.length > 0) {
//          $log.debug("update search value through route parameter");
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
//        $log.debug("getNextTweet: " + _currentTweetNumber)
        return _tweets[(_currentTweetNumber++)];
      }

      this.registerSearchStartListener = function (listener) {
        _tweetSearchStartListener.push(listener);
      }


    }
  ]
})
;
