(function() {
  var register, setup, setupModule;
  setupModule = function(moduleName, components) {
    var name, path;
    return define(((function() {
      var _results;
      _results = [];
      for (name in components) {
        path = components[name];
        _results.push(path);
      }
      return _results;
    })()).concat(['libs/angular', 'libs/angular-loader', 'libs/angular-route', 'libs/angular-animate']), function() {
      var app;
      app = angular.module(moduleName, ['ngRoute', 'ngAnimate']);
      setup(app, (function() {
        var _results;
        _results = [];
        for (name in components) {
          _results.push(name);
        }
        return _results;
      })(), arguments);
      return app;
    });
  };
  setup = function(module, names, components) {
    var i, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = names.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push(register(angular.module('app'), names[i], components[i]));
    }
    return _results;
  };
  register = function(module, name, component) {
    switch (component.type) {
      case 'config':
        return module.config(component.definition);
      case 'controller':
        return module.controller(name, component.definition);
      case 'filter':
        return module.filter(name, component.definition);
      case 'service':
        return module.service(name, component.definition);
      case 'run':
        return module.run(component.definition);
    }
  };
  return setupModule('app', {
    tweetController: 'controllers/tweetController',
    tweetListController: 'controllers/tweetListController',
    menuBarController: 'controllers/menuBarController',
    twitterfy: 'filters/twitterfy',
    dispatcher: 'responseInterceptors/dispatcher',
    twitterSearchService: 'services/twitterSearchService',
    twitterwallModelHolder: 'services/twitterwallModelHolder',
    routes: 'routes'
  });
})();
