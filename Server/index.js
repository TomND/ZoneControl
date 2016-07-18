var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dataFile = require('./player.js');

var units = [];
var players = [];

io.on('connection', function(socket) {

    io.emit('test', '12333');

    socket.on('click', function(data) {
        console.log(data);
    });


    socket.on('playerJoined', function(data) {
        var player = new dataFile.playerData();
        player.initialize(socket.id);
        players.push(player);
        socket.emit('unitData',units);
    })


    socket.on('UnitUpdate', function(data) {
        io.emit('UnitUpdate', data);
        console.log("unit data sent");
    })


    socket.on('positionUpdate',function(data){

      units.forEach(function(unit,index){
          data.forEach(function(info,index){
            if(unit.unitID == info.unitID){
              unit.x = info.x;
              unit.y = info.y;
            }
          })
      })
    })

    socket.on('createUnit', function(data) {
        console.log('unit created');
        var unitID = (Math.random() * (1000000 - 100)) + 100;
        var randX = Math.random() * (300 - 100) + 100;
        var randY = Math.random() * (300 - 100) + 100;
        console.log(unitID);
        unit = new dataFile.unitData();
        unit.initialize(unitID, socket.id,randX,randY);
        units.push(unit);
        io.emit('createUnit', {
            uID: unitID,
            x: randX,
            y: randY
        });
    });

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
