require(
  ['app', 'libs/angular']
  ( app )->
    angular.element(document).ready(->
      angular.bootstrap(document, ['app'])
    )
)
