define({
  type: "service",
  definition: ['logger', '$timeout', '$http',
    function (logger, $timeout, $http) {

      'use strict';

      function _SearchService() {
        var that = this;
        that.logger = logger.getLogger("twitterSearchService");

        var _stopped = false;
        var _query;

        this.start = function (query, callback) {
          _query = query;
          this.logger.debug("starting new Twitter search. Query=" + query);
          var max_id = "0";
          var repeated;
          (repeated = function () {
            if (!_stopped) {
              that.logger.debug("search with: " + query)
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
                    that.logger.error("Error calling search service ..." + status);
                  });
            }
          })();
        };

        this.stop = function () {
          _stopped = true
          that.logger.debug("stopping Twitter search for '" + _query);
        };

      }

      this.provideNewService = function () {
        return new _SearchService();
      }
    }
  ]
});
