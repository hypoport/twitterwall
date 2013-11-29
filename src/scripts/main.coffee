require(
  ['app', 'libs/angular', 'libs/angular-loader', 'libs/angular-route', 'libs/angular-animate']
  ( app )->
    angular.element(document).ready(->
      angular.bootstrap(document, ['app'])
    )
)
