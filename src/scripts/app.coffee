(->
  setupModule = (moduleName, components) ->
    define(
      (path for name,path of components).concat(['libs/angular', 'libs/angular-loader', 'libs/angular-route', 'libs/angular-animate' ])
      () ->
        app = angular.module(moduleName, ['ngRoute', 'ngAnimate'])
        setup(app, (name for name of components), arguments)
        return app
    )

  setup = (module, names, components) ->
    for i in [0..names.length - 1]
      register(angular.module('app'), names[i], components[i])

  register = (module, name, component) ->
    switch component.type
      when 'config' then module.config(component.definition)
      when 'controller' then module.controller(name, component.definition)
      when 'filter' then module.filter(name, component.definition)
      when 'service' then module.service(name, component.definition)
      when 'run' then module.run(component.definition)

  setupModule('app'
    tweetController: 'controllers/tweetController'
    tweetListController: 'controllers/tweetListController'
    menuBarController: 'controllers/menuBarController'
    twitterfy: 'filters/twitterfy'
    dispatcher: 'responseInterceptors/dispatcher'
    twitterSearchService: 'services/twitterSearchService'
    twitterwallModelHolder: 'services/twitterwallModelHolder'
    routes: 'routes'
  )
)()
