require(
  ['app', 'libs/angular', 'libs/angular-loader', 'libs/angular-route']
  ( app )->
    angular.element(document).ready(->
      angular.bootstrap(document, ['app'])
    )
)
