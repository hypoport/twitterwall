var https = require('https');
var fs = require('fs');

var options = {
  hostname: "api.twitter.com",
  port: 443,
  path: "/oauth2/token",
  method: "POST",
  auth: "Basic xxx"
}

var req = https.request(options, function(res){
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  console.log('DATA: ' + res);
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    fs.writeFile('answer.html', chunk);
  });
});

//req.setHeader('Content-Type', "application/x-www-form-urlencoded;charset=UTF-8");

req.on('error', function(e) {
  console.log('problem with request: ' + JSON.stringify(e));
});

// write data to request body
req.write('{grant_type:client_creadentials}');

req.end();
console.log('Request-Headers: ' + JSON.stringify(req.headers));
