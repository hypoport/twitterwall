define({
  type: 'controller',
  definition: [
    'logger', '$scope', '$http', 'twitterwallModelHolder',
    function (logger, $scope, $http, twitterwallModelHolder) {
      'use strict';

      var _logger = logger.getLogger("menuBarController");
      _logger.setLogLevel(logger.LogLevel.INFO);

      $scope.searchValue = "";
      $scope.isTwitterSignInVisible = true;
      $scope.twitterUser = {};

      $scope.doTwitterSearch = function () {
        twitterwallModelHolder.setSearchValue($scope.searchValue);
//        return false;
      };
      twitterwallModelHolder.onSearchValueChanged(function (newSearchValue) {
        $scope.searchValue = newSearchValue;
      });

      (function loadUserStatus() {
        $http
            .get('/showUser', { })
            .success(function (data, status, headers, config) {
              _logger.debug("OK" + status);
              $scope.twitterUser = data;
              $scope.isTwitterSignInVisible = !($scope.twitterUser.screen_name != undefined && $scope.twitterUser.screen_name.length > 0);
            })
            .error(function (data, status, headers, config) {
              _logger.error("Error calling showUser service ..." + status);
            });
      })();
    }
  ]
});
