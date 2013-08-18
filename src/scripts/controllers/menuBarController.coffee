define(type: 'controller', definition: [
  '$scope',
  ($scope) ->
    $scope.searchValue = ""
    $scope.doTwitterSearch = ->
      return false
    return
])
