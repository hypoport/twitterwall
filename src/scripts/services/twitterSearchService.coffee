define(type: "service", definition : [
  '$log','$timeout','$http',
  ($log,  $timeout,  $http) ->
    @.start = (query, callback) ->
      running = true
      max_id = "0"
      (repeated = ->
        $http.jsonp(
          "https://api.twitter.com/1.1/search/tweets.json"
          'params':
            'q': query
            'include_entities': "true"
            'since_id': max_id
            'callback': "JSON_CALLBACK"
        )
        .success(
          (data, status, headers, config) ->
#            $timeout(repeated, 5000)
            max_id = data.max_id_str
            callback(data.results, null)
        )
        .error(
          (data, status, headers, config) ->
            callback(null, headers.status)
        )
      )()
    @.stop = ->
      running = false
])
