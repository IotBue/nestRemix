$(function(){

    var serverName = window.location.protocol + "//" + window.location.host;
    var socket;
    if (window.location.host.indexOf('local') > -1){
      socket = io();
    }
    else {
      socket = io(serverName);
    }
    socket.emit('room', 'arduino01');
    
    socket.on('temp', function(data){
            $('.temperatura').html(data.value);
    });
    socket.on('humity', function(data){
            $('.humedad').html(data.value);
    });
    socket.on('presure', function(data){
            $('.presion').html(data.value);
    });

});