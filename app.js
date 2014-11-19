var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');
var bodyParser = require('body-parser');
var geoip = require('geoip-lite');

  
var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//TODO: MOVE TO ROUTER.
app.enable('trust proxy');

// assuming POST: temp=foo        <-- URL encoding
// or       POST: {"temp":"foo"}  <-- JSON encoding
app.post('/api/v1/test', function(req, res) {
  console.log(req.body);
  var temp = req.body.temp;
  var humidity = req.body.humidity;
  var pressure = req.body.pressure;
  if(temp && humidity && pressure){
    showData(temp, humidity, pressure);
    saveData(temp, humidity, pressure);
    res.json("OK");
  }
  else{
    res.json("ERROR");
  }

  console.log(req.ip);
  var geo = geoip.lookup(req.ip);
  console.log(geo);
});

app.get('/api/v1/preferences/:id', function(req, res) {
  
  var id = req.params.id;
  //TODO: Check versus DB
  if (id === 'arduino01'){
    res.json({id: id , value: 20});
  }else {
      res.json({error: true});
  }
});
app.post('/api/v1/preferences', function(req, res) {
  //TODO: Receive
  var temp = req.body.temp;
  res.json({result: true, preference:req.body.temp}); 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//add this so the browser can GET the bower files
app.use('/js/bower_components', express.static(__dirname + '/js/bower_components'));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var server =http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//io sockets would address to all the web-clients talking to this nodejs server
var io = require('socket.io')(server);

var socket;
function showData(temp, humidity, pressure, isDeviceOn){
  var tempMsg = {value: temp};
  socket.emit('temp',tempMsg);

  //TODO: Reeplace for real value
  var humidityMsg = {value: humidity};
  socket.emit('humity', humidityMsg);

  //TODO: Reeplace for real value
  var pressureMsg = {value: pressure};
  socket.emit('presure',pressureMsg );

  //TODO: Repleace with real data
  var isDeviceOnMsg = {value: isDeviceOn};
  socket.emit('systemStatus',isDeviceOnMsg);

}

function saveData(temp, humidity, pressure){
  http.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk", function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var bodyRaw = Buffer.concat(bodyChunks);
      console.log('BODY: ' + bodyRaw);
      var body = JSON.parse(bodyRaw);
      console.log('TEMP: ' + body.main.temp);
      console.log('HUM: ' + body.main.humidity);
      console.log('PRES: ' + body.main.pressure);
      // ...and/or process the entire body here.
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

//some web-client connects
socket = io.sockets.on('connection', function (socket) {
  console.log("connnect"); 
  //Please Remove 
  setInterval(function(){
    //TODO: Reeplace for real value
    var temp = Math.floor((Math.random() * 20) + 20);
    var humidity = Math.floor((Math.random() * 100) + 0);
    var pressure = Math.floor((Math.random() * -300) + 1300);
    var isDeviceOn = Math.random() > 0.5;

    //showData(temp,humidity,pressure,isDeviceOn);
  
  },2000); 
  setInterval(function(){
    //TODO: replace with real info
    
    var predictions =[];
    for (var i = 0; i < 3; i++) {
      var prediction = {
        //moment of the day  0 - MORNING, 1- AFTERNOON, 2-NIGTH
        moment: i,
        //from sensors
        temperature: Math.floor((Math.random() * 20) + 20),
        //from weather channel api
        prediction:Math.floor((Math.random() * 20) + 20),
        //from conculsion from API
        conculsion:Math.floor((Math.random() * 20) + 20),
        //status from the system
        isDeviceOn: Math.random() > 0.5
      };
      predictions.push(prediction);
    };
    socket.emit('day-predicition',predictions);
    
  },2000); 
  //some web-client disconnects
  socket.on('disconnect', function (socket) {
    console.log("disconnect");
  });
  
  //some web-client sents in a msg
  socket.on('client', function (data) {
    console.log(data);
  });
});



