define({
  type: "service",
  definition: ['$log', '$timeout', '$http', '$window',
    function ($log, $timeout, $http, $window) {

      function _SearchService() {

        var _stopped = false;
        var _query;

        this.start = function (query, callback) {
          _query = query;
          $log.debug("[" + new Date().toLocaleTimeString() + "] twitterSearchService : starting new Twitter search. Query=" + query);
          var max_id = "0";
          var repeated;
          (repeated = function () {
            if (!_stopped) {
              $log.debug("[" + new Date().toLocaleTimeString() + "] twitterSearchService : search with: " + query)
              $http
                  .get('/search', {
                    'params': {
                      'q': query,
                      'include_entities': "true",
                      'since_id': max_id
                    }
                  })
                  .success(function (data, status, headers, config) {
                    if (!_stopped) {
                      $timeout(repeated, 15000);
                    }
                    max_id = data.max_id;
                    callback(data.tweets);
                  })
                  .error(function (data, status, headers, config) {
                    $log.debug("[" + new Date().toLocaleTimeString() + "] twitterSearchService : Error calling search service ..." + status);
                  });
            }
          })();
        };

        this.stop = function () {
          _stopped = true
          $log.debug("[" + new Date().toLocaleTimeString() + "] twitterSearchService : stopping Twitter search for '" + _query);
        };

      }

      this.provideNewService = function () {
        return new _SearchService();
      }
    }
  ]
});
