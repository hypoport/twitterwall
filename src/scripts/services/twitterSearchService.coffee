angular.module('app').service 'twitterSearchService', ['$log', '$timeout', '$http', ($log, $timeout, $http) ->
  self = @

  self.start = (query, callback) ->
    $http(
      "method": "GET"
      "url": "http://search.twitter.com/search.json"
      "params":
        "q": query
        "include_entities": "true")
      .success((data, status, headers, config) ->
        data.results)
      .error((data, status, headers, config) ->
        #console.error("Twitter Error 1/2 - Status:" + status);
        #console.error("Twitter Error 2/2 - Headers:" + headers);
        [])
]