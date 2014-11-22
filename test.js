var http = require('http');

var status = {
  deviceId: 'testdevice',
  temp : Math.floor(Math.random()*50),
  humidity : Math.floor(Math.random()*100),
  pressure : Math.floor(Math.random()*1000)
};

var statusString = JSON.stringify(status);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': statusString.length
};

var options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/v1/stats',
  method: 'POST',
  headers: headers
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

console.log(statusString);
// write data to request body
req.write(statusString);
req.end();