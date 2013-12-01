var app, dir, express, io, port, routes, server, _ref, _ref1;

express = require('express');

routes = require('./routes');

dir = "" + __dirname + "/dist";

port = (_ref = (_ref1 = process.env.PORT) != null ? _ref1 : process.argv.splice(2)[0]) != null ? _ref : 3005;

app = express();

server = require('http').createServer(app);

io = require('socket.io').listen(server);

app.configure(function() {
  app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.errorHandler());
  app.use(express["static"](dir));
  app.use(app.router);
  return routes(app, dir);
});

module.exports = server;

module.exports.use = function() {
  return app.use.apply(app, arguments);
};
