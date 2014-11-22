var express       = require('express'),
    path          = require('path'),
    favicon       = require('static-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    http          = require('http'),
    routes        = require('./routes/index'),
    mongo         = require('./models/mongo-core'),
    models       = require('./models/models'),
    bodyParser    = require('body-parser'),
    geoip         = require('geoip-lite');

  
var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//TODO: MOVE TO ROUTER.
app.enable('trust proxy');



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
// assuming POST: temp=foo        <-- URL encoding
// or       POST: {"temp":"foo"}  <-- JSON encoding
//Get device preferences
app.get('/api/v1/status/:id', function(req, res) {
  
  var id = req.params.id;
  models.preferences.findOne( {'deviceId' : id }, function(e, p){
    if (p){
      res.json('/' + p.status);
    }
    else{
      res.json({error: true});
    }
  });
});
app.post('/api/v1/stats', function(req, res) {
  console.log(req.body);

  var m = {
     temp: req.body.temp, 
     humidity: req.body.humidity, 
     pressure:  req.body.pressure,
     deviceId:  req.body.deviceId,
  };
  


  if(m.temp && m.humidity && m.pressure && m.deviceId){

    saveData(m);
    broadcastData(m);
    
    sendPredictions(m);
    res.json('OK');

  }
  else{
    res.json("ERROR on Data");
  }

  console.log(req.ip);
  var geo = geoip.lookup(req.ip);
  console.log(geo);
});

app.get('/api/v1/stats/:id', function(req, res) {
  var id = req.params.id;
  models.measures.find( {'deviceId' : id }, function(e, p){
    if (p){
      res.json(p);
    }
    else{
      res.json({error: true});
    }
  });

});


var devices =[];

//Get device preferences
app.get('/api/v1/preferences/:id', function(req, res) {
  
  var id = req.params.id;
  models.preferences.findOne( {'deviceId' : id }, function(e, p){
    if (p){
      res.json(p);
    }
    else{
      res.json({error: true});
    }
  });
});


//Save preferences
app.post('/api/v1/preferences', function(req, res) {
  
  var value = req.body.temperature;
  var deviceId = req.body.deviceId;
  
   models.preferences.findOne( {'deviceId' : deviceId }, function(e, p){
    if (p){
      p.temperature = value,
      p.status = 'OFF';
      p.save();
      res.json(p);

    }
    else{
      res.json({error: true});
    }
  });


});



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
function broadcastData(m,p){
  

  for (var i = 0; i < sockets.length; i++) {
    if (sockets[i].room === m.deviceId){
        
        var socket = sockets[i];
        (function(s){models.preferences.findOne( {'deviceId' : m.deviceId }, function(e, p){
          console.log(p.status);
          var tempMsg = {value: m.temp};
          io.sockets.in(s.room).emit('temp',tempMsg);
          var humidityMsg = {value: m.humidity};
          io.sockets.in(s.room).emit('humity', humidityMsg);
          var pressureMsg = {value: m.pressure};
          io.sockets.in(s.room).emit('presure',pressureMsg );
          var deviceStatus = {value: p.status};
          io.sockets.in(s.room).emit('systemStatus',deviceStatus);
        })
        })(socket);
        break;
    }
  };
  
}

function saveData(m){
  console.log('save');
  //Find device or create
  models.preferences.findOne( {'deviceId' : m.deviceId }, function(e, p){

    if (p){
      console.log('found', p );
    }

    else{
      console.log(e);
      var newP = models.preferences({
        deviceId: m.deviceId,
        temperature: 20 //default
      });
      newP.save();
    }
  });
  //Save new stats
  var newStat = new models.measures(m);
  newStat.save();
}

function sendPredictions(m){
   //TODO: Right now only for BA.
  http.get("http://api.openweathermap.org/data/2.5/forecast?q=Buenos Aires,AR", function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      // ...and/or process the entire body here.
      var bodyRaw = Buffer.concat(bodyChunks);
      var body = JSON.parse(bodyRaw);
      //List exists when data exists
      if(body.list){
        //Data from current weather
        var tempNow = body.list[0].main.temp-273.15;
        var humidityNow = body.list[0].main.humidity;
        var pressureNow = body.list[0].main.pressure;
        //Data from next weather prediction
        var tempNext = body.list[1].main.temp-273.15;
        var humidityNext = body.list[1].main.humidity;
        var pressureNext = body.list[1].main.pressure;


        
        
        models.preferences.findOne( {'deviceId' : m.deviceId }, function(e, p){
            
            console.log('TEMP INT NOW: ' + m.temp);
            console.log('TEMP INT DES: ' + p.temperature);
            console.log('TEMP EXT NOW: ' + tempNow);
            console.log('TEMP EXT NEXT: ' + tempNext);

            //THE GREAT ALGORITHM
            // (tint - tdes) + dext + dint = 0
            var dt = m.temp - p.temperature;
            var dext = tempNext - tempNow;
            var dint = dt + dext;

            console.log('DT: ' + dt);
            console.log('DEXT: ' + dext);
            console.log('DINT: ' + dint);

            var status = '';
            if(dint>1.0){
              status='COLD';
            }
            else if(dint<-1.0){
              status='WARM';
            }
            else{
              status='OFF';
            }
            p.status = status;
            p.save();

             var predictions =[];
              for (var i = 1; i < 2; i++) {
                var prediction = {
                  //moment of the day  0 - MORNING, 1- AFTERNOON, 2-NIGTH
                  moment: i,
                  //from sensors
                  temperature: m.temp,
                  //from weather channel api
                  prediction:Math.round(tempNext * 100) / 100,
                  //from conculsion from API
                  temperatureDifference:Math.round(dint * 100) / 100,
                  //TODO: UPDATE how much it will take to change it
                  timeToGetThere:0.5,
                  //status from the system
                  isDeviceOn:status,
                };
                predictions.push(prediction);
              };
              for (var i = 0; i < sockets.length; i++) {
                if (sockets[i].room ===m.deviceId){
                  io.sockets.in(sockets[i].room).emit('day-predicition',predictions);
                  break;
                }
              }

        });        
      
      }
      else{
        console.log("No data found for that location");
      }
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}


 //Please Remove 
  setInterval(function(){
    //TODO: Reeplace for real value
    var temp = Math.floor((Math.random() * 20) + 20);
    var humidity = Math.floor((Math.random() * 100) + 0);
    var pressure = Math.floor((Math.random() * -300) + 1300);
    var isDeviceOn = Math.random() > 0.5;

    var m = {
      temp: temp,
      humidity: humidity,
      pressure: pressure,
      isDeviceOn: isDeviceOn, 
      deviceId: 'arduino01'
    }
    broadcastData(m);
  
  },2000); 
  setInterval(function(){
    //TODO: replace with real info
    
    var predictions =[];
    var deviceId = 'arduino01';
    for (var i = 0; i < 1; i++) {
      var prediction = {
        //moment of the day  0 - MORNING, 1- AFTERNOON, 2-NIGTH
        moment: i,
        //from sensors
        temperature: Math.floor((Math.random() * 20) + 20),
        //from weather channel api
        prediction:Math.floor((Math.random() * 20) + 20),
        //from conculsion from API
        temperatureDifference:Math.floor((Math.random() * 2) + 6),
        //how much it will take to change it
        timeToGetThere:Math.floor((Math.random() * 2) + 6),
        //status from the system
        isDeviceOn: Math.random() > 0.5,
      };
      predictions.push(prediction);
    };
    for (var i = 0; i < sockets.length; i++) {
      if (sockets[i].room === deviceId){
        io.sockets.in(sockets[i].room).emit('day-predicition',predictions);
        break;
      }
    }
    
  },2000); 
  
//some web-client connects


var sockets = []
io.sockets.on('connection', function (socket) {
  console.log("connnect"); 

  sockets.push(socket);

  //some web-client disconnects
  socket.on('disconnect', function (socket) {
    console.log("disconnect");
  });
  
  //some web-client sents in a msg
  socket.on('client', function (data) {
    console.log(data);
  });

  //we expect to get a ping from 
  //them saying what room they want to join
  socket.on('room', function(data) {
      if(socket.room){
          socket.leave(socket.room);
      }
      socket.room = data;
      console.log('new connection to: ' + data);
      socket.join(data);
    });
});



