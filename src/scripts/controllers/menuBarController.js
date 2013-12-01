define({
  type: 'controller',
  definition: [
    '$scope', 'twitterwallModelHolder', function($scope, twitterwallModelHolder) {
      $scope.searchValue = "";
      $scope.doTwitterSearch = function() {
        twitterwallModelHolder.setSearchValue($scope.searchValue);
        return false;
      };
      twitterwallModelHolder.onSearchValueChanged(function(newSearchValue) {
        $scope.searchValue = newSearchValue;
      });
    }
  ]
});
