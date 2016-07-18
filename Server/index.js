var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var units = null;

io.on('connection', function(socket) {

    io.emit('test', '12333');

    socket.on('click',function(data){
      console.log(data);
    });


    socket.on('UnitUpdate',function(data){
      io.emit('UnitUpdate',data);
      console.log("unit data sent");
    })

  /*  if(units == null){
      socket.on('GetUnits',function(data){
        units = data;
      })
    }
    else{

    }*/

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
