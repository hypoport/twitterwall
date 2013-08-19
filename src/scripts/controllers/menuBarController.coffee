define(type: 'controller', definition: [
  '$scope', 'twitterwallModelHolder',
  ($scope, twitterwallModelHolder) ->
    $scope.searchValue = ""

    $scope.doTwitterSearch = ->
      twitterwallModelHolder.setSearchValue($scope.searchValue)
      return false

    twitterwallModelHolder.onSearchValueChanged (newSearchValue) ->
      $scope.searchValue = newSearchValue
      return

    return
])
