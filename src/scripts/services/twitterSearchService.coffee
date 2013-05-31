angular.module('app').service 'twitterSearchService', ['$log', '$timeout', '$http', ($log, $timeout, $http) ->
  self = @

  self.start = (query, callback) ->
    max_id = "0"
    repeated = ->
      $http.jsonp(
        "http://search.twitter.com/search.json"
        "params":
          "q": query
          "include_entities": "true"
          "since_id": max_id
          "callback": "JSON_CALLBACK")
        .success((data, status, headers, config) ->
          $timeout(repeated, 5000)
          max_id = data.max_id_str
#          console.log(data)
          callback(data.results)
        )
        .error((data, status, headers, config) ->
          #console.error("Twitter Error 1/2 - Status:" + status);
          #console.error("Twitter Error 2/2 - Headers:" + headers);
          [])

    repeated()
]
