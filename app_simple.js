var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('port', process.env.PORT || 5000);
app.use('/', routes);

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



