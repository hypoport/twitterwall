(function () {

  var setupModule = function (moduleName, components) {
    var name, path;
    return define(((function () {
      var _results = [];
      for (name in components) {
        path = components[name];
        _results.push(path);
      }
      return _results;
    })()).concat(['libs/rAF', 'libs/angular', 'libs/angular-loader', 'libs/angular-route', 'libs/angular-animate', 'libs/jquery-2.0.3.min']), function () {

      var app = angular.module(moduleName, ['ngRoute', 'ngAnimate']);
      var names = (function () {
        var _results = [];
        for (name in components) {
          _results.push(name);
        }
        return _results;
      })();
      setup(app, names, arguments);
      return app;
    });
  };

  var setup = function (module, names, components) {
    for (var i = 0, len = names.length; i < len; i++) {
      register(angular.module('app'), names[i], components[i]);
    }
  };

  var register = function (module, name, component) {
    switch (component.type) {
      case 'config':
        return module.config(component.definition);
      case 'controller':
        return module.controller(name, component.definition);
      case 'directive':
        return module.directive(name, component.definition);
      case 'filter':
        return module.filter(name, component.definition);
      case 'service':
        return module.service(name, component.definition);
      case 'run':
        return module.run(component.definition);
    }
  };

  setupModule('app', {
    movingElementsService: 'services/movingElementsService',
    singleTweetController: 'controllers/singleTweetController',
    dualTweetController: 'controllers/dualTweetController',
    tweetListController: 'controllers/tweetListController',
    menuBarController: 'controllers/menuBarController',
    tweetDirective: 'directives/tweetDirective',
    twitterfy: 'filters/twitterfy',
    dispatcher: 'responseInterceptors/dispatcher',
    twitterSearchService: 'services/twitterSearchService',
    twitterwallModelHolder: 'services/twitterwallModelHolder',
    routes: 'routes'
  });

})();
