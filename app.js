var socket = require('socket.io');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

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


//using node-osc library: 'npm install node-osc'
//this will also install 'osc-min'
var osc = require('node-osc');
//listening to OSC msgs to pass on to the web via nodejs
var oscServer = new osc.Server(3334, '0.0.0.0');
//sending OSC msgs to a client
var oscClient = new osc.Client('127.0.0.1', 3333);


//io sockets would address to all the web-clients talking to this nodejs server
var io = socket.listen(server);

//some web-client connects
io.sockets.on('connection', function (socket) {
  console.log("connnect");
  //msg sent whenever someone connects
  socket.emit("serverMsg",{txt:"Connected to server"});
  
  //some web-client disconnects
  socket.on('disconnect', function (socket) {
    console.log("disconnect");
  });
  
  //some web-client sents in a msg
  socket.on('clientMsg', function (data) {
    console.log(data.txt);
    //pass the msg on to the oscClient
    var msg =  new osc.Message('/clientMsg')
    msg.append(data.txt)
    oscClient.send(msg)
  });
  
  //received an osc msg
  oscServer.on("message", function (msg, rinfo) {
    console.log("Message:");
    console.log(msg);
    //pass the msg on to all of the web-clients
    //msg[1] stands for the first argument received which in this case should be a string
    socket.emit("serverMsg",{txt: msg[1]});
  });
});



