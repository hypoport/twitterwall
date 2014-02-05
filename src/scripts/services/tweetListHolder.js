define({
  type: "service",
  definition: [
    'logProvider', '$routeParams', '$location', 'twitterSearchService', 'twitterwallModelHolder',
    function (logProvider, $routeParams, $location, twitterSearchService, twitterwallModelHolder) {
      'use strict';

      var _tweets = new Array();
      var _maxTweetCount = 60;
      var _currentTweetNumber = 0;
      var _tweetSearchStartListener = []
      var _activeSearchService;
      var _searchWasStarted = false;
      var _logger = logProvider.newInstance("tweetListHolder");

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

      var _addNewTweet = function (tweet) {
        _tweets.unshift(tweet);
        _tweets = _tweets.slice(0, _maxTweetCount);
      };

      var _fireSearchStartEvent = function () {
        var _i, _len, _ref, listener, error;
        _ref = _tweetSearchStartListener;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listener = _ref[_i];
          try {
            listener();
          } catch (_error) {
            error = _error;
            _logger.error(error);
          }
        }
        _searchWasStarted = true;
      }

      var _startRequest = function (newSearchValue) {
        _logger.debug("tweets before dropping: " + _tweets.length);
        _logger.debug("start new search on search value:" + newSearchValue);
        while (_tweets.length > 0) {
          _tweets.pop();
        }
        _logger.debug("tweets before search: " + _tweets.length);

        if (newSearchValue && newSearchValue.length > 0) {
          _activeSearchService = twitterSearchService.provideNewService();
          _logger.debug("activeSearchService " + _activeSearchService);
          _activeSearchService.start(newSearchValue, function (tweets) {
                // http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
                if (tweets.length > 0) {
                  _logger.debug("search results received and inserted: " + tweets.length);
                  _currentTweetNumber = 0; // move pointer to first entry
                  var tweet, _i, _len;
                  for (_i = 0, _len = tweets.length; _i < _len; _i++) {
                    tweet = tweets[_i];
                    _addNewTweet(tweet);
                  }
                  _logger.debug("tweetListHolder : current tweet length: " + _tweets.length);
                  if (!_searchWasStarted) {
                    _fireSearchStartEvent();
                  }
                }
                else {
                  _logger.debug("no new tweets received");
                }
              }
          );

        }
      };

      var startSearch = function () {
        if (twitterwallModelHolder._searchValue && twitterwallModelHolder._searchValue.length > 0) {
          _logger.debug("update search value through route parameter");
          _startRequest(twitterwallModelHolder._searchValue)
        }
      };

      if ($routeParams.query && $routeParams.query.length > 0) {
        twitterwallModelHolder.setSearchValue($routeParams.query);
      }

      this.getNextTweet = function () {
        if (_currentTweetNumber >= _tweets.length) {
          _currentTweetNumber = 0;
        }
        _logger.debug("getNextTweet: " + _currentTweetNumber)
        return _tweets[(_currentTweetNumber++)];
      }

      this.registerSearchStartListener = function (listener) {
        _tweetSearchStartListener.push(listener);
      }


    }
  ]
})
;
