define({
  type: 'controller',
  definition: [
    '$log', '$scope', '$http', 'twitterwallModelHolder',
    function ($log, $scope, $http, twitterwallModelHolder) {
      'use strict';

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
              $log.debug("[" + new Date().toLocaleTimeString() + "] menuBarController : OK" + status);
              $scope.twitterUser = data;
              $scope.isTwitterSignInVisible = !($scope.twitterUser.screen_name != undefined && $scope.twitterUser.screen_name.length > 0);
            })
            .error(function (data, status, headers, config) {
              $log.debug("[" + new Date().toLocaleTimeString() + "] menuBarController : Error calling showUser service ..." + status);
            });
      })();
    }
  ]
});
