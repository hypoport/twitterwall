define({
  type: 'controller',
  definition: [
    'logProvider', '$scope', '$http', 'twitterwallModelHolder',
    function (logProvider, $scope, $http, twitterwallModelHolder) {
      'use strict';

      var _controller = this;
      _controller.logger = logProvider.newInstance("menuBarController");
      _controller.logger.setLogLevel(logProvider.LogLevel.INFO);

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
              _controller.logger.debug("OK" + status);
              $scope.twitterUser = data;
              $scope.isTwitterSignInVisible = !($scope.twitterUser.screen_name != undefined && $scope.twitterUser.screen_name.length > 0);
            })
            .error(function (data, status, headers, config) {
              _controller.logger.error("Error calling showUser service ..." + status);
            });
      })();
    }
  ]
});
