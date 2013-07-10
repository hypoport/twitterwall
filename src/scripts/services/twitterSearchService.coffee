define(type: "service", definition : [
  '$log','$timeout','$http',
  ($log,  $timeout,  $http) ->
    @.start = (query, callback) ->
      $http.defaults.headers.common.Authorization = "Bearer xxxx"
      running = true
      max_id = "0"
      (repeated = ->
        $http.jsonp(
          "https://api.twitter.com/1.1/search/tweets.json"
#          'headers' :
#            'Authorization' :
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
            callback(data.results)
        )
        .error(
          (data, status, headers, config) ->
#            no concret error message received; headers are empty
            callback({error:{message : "Anfrage war fehlerhaft."}})
        )
        $log.info($http.defaults.headers)
      )()
    @.stop = ->
      running = false
])