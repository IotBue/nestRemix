var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 5000);

var msg = 'Hello World!';
app.get('/', function(request, response) {
  response.send(msg);
});

// assuming POST: temp=foo        <-- URL encoding
// or       POST: {"temp":"foo"}  <-- JSON encoding
app.post('/test', function(req, res) {
  console.log(req.body);
  msg = req.body.msg;
  res.json('OK');
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// assuming POST: temp=foo        <-- URL encoding
// or       POST: {"temp":"foo"}  <-- JSON encoding
app.post('/api/v1/stats', function(req, res) {
  console.log(req.body);

  var m = {
     temp: req.body.temp, 
     humidity: req.body.humidity, 
     pressure:  req.body.pressure,
     deviceId:  req.body.deviceId,
  };

  if(m.temp && m.humidity && m.pressure && m.deviceId){
    msg = 'Temp is: ';
    msg += m.temp;
    res.json('OK');
  }
  else{
    res.json('BAD REQUEST');
  }
});

var server =http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



