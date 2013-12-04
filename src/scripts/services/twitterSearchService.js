define({
  type: "service",
  definition: [
    '$log', '$timeout', '$http', '$window', function ($log, $timeout, $http, $window) {
      var stopped = false;

      this.start = function (query, callback) {
        stopped = false;
        var max_id, repeated;
        $log.info("starting new Twitter search. Query=" + query);
        max_id = "0";
        (repeated = function () {
          return $http.get($window.appConfiguration.searchUrl, {
            'params': {
              'q': query,
              'include_entities': "true",
              'since_id': max_id
            }
          }).success(function (data, status, headers, config) {
                if (!stopped) {
                  $timeout(repeated, 5000);
                }
                max_id = data.max_id;
                return callback(data.tweets);
              }).error(function (data, status, headers, config) {
                return [];
              });
        })();
      };
      this.stop = function () {
        stopped = true
      };
      return this;
    }
  ]
});
