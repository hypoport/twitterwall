define({
  type: "service",
  definition: ['$log', '$timeout', '$http', '$window',
    function ($log, $timeout, $http, $window) {

      function _SearchService() {

        var _stopped = false;
        var _query;

        this.start = function (query, callback) {
          _query = query;
          $log.info("starting new Twitter search. Query=" + query);
          var max_id = "0";
          var repeated;
          (repeated = function () {
            if (!_stopped) {
              $log.debug("search with: " + query)
              $http
                  .get($window.appConfiguration.searchUrl, {
                    'params': {
                      'q': query,
                      'include_entities': "true",
                      'since_id': max_id
                    }
                  })
                  .success(function (data, status, headers, config) {
                    if (!_stopped) {
                      $timeout(repeated, 60000);
                    }
                    max_id = data.max_id;
                    callback(data.tweets);
                  })
                  .error(function (data, status, headers, config) {
                    $log.info("Error calling search service ..." + status);
                  });
            }
          })();
        };

        this.stop = function () {
          _stopped = true
          $log.info("stopping Twitter search for '" + _query);
        };

      }

      this.provideNewService = function () {
        return new _SearchService();
      }
    }
  ]
});
