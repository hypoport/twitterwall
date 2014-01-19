var express = require('express');
var httpProxy = require('http-proxy');

/*
 A simple HTTP server, serving static files from ./dist folder and forwarding /search?* request to another Tomcat server.

 Usage (run in project root folder):
 $> node "node tools/development-server.js"
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
var reverseProxyHandler = function (req, res) {
  var proxy = new httpProxy.RoutingProxy();
  proxy.proxyRequest(req, res, {
    host: tomcatForwardHost,
    port: tomcatForwardPort
  });
}

var forwarEndpointsToTomcat = ['/search', '/showUser', '/doTwitterSignIn', '/doTwitterCallback'];
forwarEndpointsToTomcat.forEach(function (elem, index) {
  console.log('Forwarding : ' + elem);
  app.get(elem, reverseProxyHandler);
});

app.use(express.static(distFolder));

app.listen(port);
console.log('Forwarding to      : ' + tomcatForwardHost + ':' + tomcatForwardPort);
console.log('Serving satic from : ' + distFolder);
console.log('Listening on port  : ' + port);