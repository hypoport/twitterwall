define({
  type: 'config',
  definition: [
    '$httpProvider', function($httpProvider) {
      return $httpProvider.responseInterceptors.push([
        '$log', '$rootScope', '$q', function($log, $rootScope, $q) {
          var error, success;
          success = function(response) {
            $rootScope.$broadcast("success:" + response.status, response);
            return response;
          };
          error = function(response) {
            var deferred;
            deferred = $q.defer();
            $rootScope.$broadcast("error:" + response.status, response);
            return $q.reject(response);
          };
          return function(promise) {
            return promise.then(success, error);
          };
        }
      ]);
    }
  ]
});
