var express = require('express');
var httpProxy = require('http-proxy');

/*
 A simple HTTP server, serving static files from ./dist folder and forwarding /search?* request to another Tomcat server.
 */

// configure your running tomcat instance here
var tomcatForwardPort = 8000;
var tomcatForwardHost = 'localhost';

// default configuration
var distFolder = "./dist";
var port = 8080;

// ##########################################################################
// App starts here.
// ##########################################################################
var app = express();
app.get('/search', function (req, res) {
  var proxy = new httpProxy.RoutingProxy();
  proxy.proxyRequest(req, res, {
    host: tomcatForwardHost,
    port: tomcatForwardPort
  });
});

app.use(express.static(distFolder));

app.listen(port);
console.log('Serving from      : ' + distFolder);
console.log('Forwarding to     : ' + tomcatForwardHost + ':' + tomcatForwardPort);
console.log('Listening on port : ' + port);