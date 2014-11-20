(function() {

  'use strict';


  var margin = 30,
  width = parseInt(d3.select("#chart").style("width")) - margin * 2,
  height = parseInt(d3.select("#chart").style("height")) - (margin )  * 2;
  
  var temperatures = [];

    

    var serverName = window.location.protocol + "//" + window.location.host;
    var socket;
    if (window.location.host.indexOf('local') > -1){
      socket = io();
    }
    else {
      socket = io(serverName);
    }
    

    //Sync Status 
    socket.on('temp', function(data){
            $('.temperatura').html(data.value);
            temperatures.push(data.value);
            d3.map(temperatures);
            loadData();

    });

    socket.on('humity', function(data){
            $('.humedad').html(data.value);
    });

    socket.on('presure', function(data){
            $('.presion').html(data.value);
    });
    
    //Load Preferences
    var $roomPreference = $('.room');
    $.get("/api/v1/preferences/" + deviceId , function( data ) {
      if (data.error){
        $('.dashboard').hide();
        $('.deviceId').html(deviceId);
        $('.error').show();
      }
      else {
        $roomPreference.val(data.value);
      }      
    });

    //Save preferences
    $roomPreference.on('change', function(){
      console.log($roomPreference.val());
      var preferences = {
        value: $roomPreference.val(),
        id : deviceId
      };
      $.post("/api/v1/preferences/", preferences, function( data ) {
        console.log(data);
      });
    })

    //Update system status
    socket.on('systemStatus', function(data){
          //if device is on
          if (data.value){
            $('.switch').addClass('theme--user-input');
            $('.switch').removeClass('theme--introduction-to-media');

            $('.status').html('ON');

          }
          else {
            $('.switch').removeClass('theme--user-input');
            $('.switch').addClass('theme--introduction-to-media');
            $('.status').html('OFF');
          }
    });


        var moments=[];
        moments.push('9:00');
        moments.push('14:00');
        moments.push('20:00');
    socket.on('day-predicition', function(data){

        
        var predictionsHtml = '';
        for (var i = 0; i < data.length; i++) {
          var current = data[i];
          //TODO: Replace with a nice template engine
          var status = current.isDeviceOn ? 'ON' : 'OFF'
            predictionsHtml +='<tr>';
            predictionsHtml +='<td data-th="hora"><code>' + moments[current.moment]+ ' </code></td>';
            predictionsHtml +='<td data-th="availability">'+current.temperature + ' C </td>';
            predictionsHtml +='<td data-th="description">'+ current.prediction +  ' C </td>';
            predictionsHtml +='<td data-th="description">' + current.conculsion + ' C -( ' + status +  ')</td>';
            predictionsHtml +='</tr>';
        };

        $('.predictions').html(predictionsHtml);
    });
   
  var n = 30,
  random = d3.random.normal(0, .1);

  //d3.range(n).map(random);
  //d3.range(30);


  var x = d3.scale.linear()
  .domain([1, 5])
  .range([0, width]);

  var y = d3.scale.linear()
  .domain([0, 50])
  .range([height, 0])
  .nice();

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("right");


  var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d, i) { return x(i); })
  .y(function(d, i) { return y(d); });


  // var temperatura = d3.select("#temperatura .numero .valor")
  //     .datum(data)
  //     .html(function d(){d.Temperatura});

  var chart = d3.select("#chart")
  .attr("width", width + margin*2)
  .attr("height", height + margin*2)
  .attr("shape-rendering","optimizeSpeed")
  .attr("color-rendering","optimizeSpeed")
  .append("g")
  .attr("transform", "translate(" + margin + "," + margin + ")");

  chart.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width)
  .attr("height", height);

  chart.append("g")
  .attr("class", "y axis")
  .call(yAxis);

  var path = chart.append("g")
  .attr("clip-path", "url(#clip)")
  .append("path")
  .datum(temperatures)
  .attr("class", "line")
  .attr("d", line);

  
  // tick();


   // push a new data point onto the back
    
    
  var loadData = function () {
      
       // push a new data point onto the back
      temperatures.push(temperatures[temperatures.length -1]);

      // pop the old data point off the front
      temperatures.shift();

      // transition the line
      path.transition()
          .duration(1550)
          .ease("linear")
          .attr("d", line)
          .each("end", function() { loadData(path, line, temperatures); });
          
      d3.select(".valor").datum(temperatures[temperatures.length -1]).html(function d(messure) {
         return messure;
       });

    // pop the old data point off the front
  };

    


})()