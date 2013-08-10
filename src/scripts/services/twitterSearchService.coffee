define(type: "service", definition : [
  '$log','$timeout','$http','$window',
  ($log,  $timeout,  $http, $window) ->
    @.start = (query, callback) ->
      running = true
      max_id = "0"
      (repeated = ->
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
        )
      )()
    @.stop = ->
      running = false
])
