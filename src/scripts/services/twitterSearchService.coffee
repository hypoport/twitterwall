define(type: "service", definition : [
  '$log','$timeout','$http','$window',
  ($log,  $timeout,  $http, $window) ->
    @.start = (query, callback) ->
      $log.info("start timer")
      max_id = "0"
      running = true
      (repeated = ->
        $log.info("request for twitter with: " + query)
        $http.get(
          $window.appConfiguration.searchUrl
          'params':
            'q': query
            'include_entities': "true"
            'since_id': max_id
        )
        .success(
          (data, status, headers, config) ->
            $timeout(repeated, 5000)
            max_id = data.max_id
            callback(data.tweets)
        )
        .error(
          (data, status, headers, config) ->
            []
            $log.info("error")
        )
      )()
    @.stop = () ->
      $log.info("stop timer")
      running = false
])
