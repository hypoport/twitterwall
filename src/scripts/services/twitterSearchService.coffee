define(type: "service", definition : [
  '$log','$timeout','$http',
  ($log,  $timeout,  $http) ->
    @.start = (query, callback) ->
      running = true
      max_id = "0"
      (repeated = ->
        $http.jsonp(
          "http://search.twitter.com/search.json"
          'params':
            'q': query
            'include_entities': "true"
            'since_id': max_id
            'callback': "JSON_CALLBACK"
        )
        .success(
          (data, status, headers, config) ->
            $timeout(repeated, 5000)
            max_id = data.max_id_str
            callback(data.results)
        )
        .error(
          (data, status, headers, config) ->
            []
        )
      )()
    @.stop = ->
      running = false
])
