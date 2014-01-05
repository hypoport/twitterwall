define({
  type: "service",
  definition: ['$log', '$timeout', '$http', '$window',
    function ($log, $timeout, $http, $window) {

      var _stopped = false;

      this.start = function (query, callback) {
        _stopped = false;
        $log.info("starting new Twitter search. Query=" + query);
        var max_id = "0";
        var repeated;
        (repeated = function () {
          if (!_stopped) {
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
      };

      return this;
    }
  ]
});
