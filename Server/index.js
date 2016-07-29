var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dataFile = require('./player.js');

var units = [];
var players = [];

io.on('connection', function(socket) {

    socket.on('disconnect',function(){
      units.forEach(function(unit,index){
        if(unit.playerID == socket.id){
          units.splice(index,1);
          io.emit('disconnect',unit.unitID);
        }
      })
    })

    socket.on('newTarget',function(data){
      io.emit('newTarget',data);
    })


    socket.on('unitDead',function(data){
      units.forEach(function(unit,index){
        if(unit.unitID == data){
          units.splice(index,1);
        }
      })
    })

    socket.on('bullet',function(data){
      var bulletID = (Math.random() * (1000000 - 100)) + 100;
      data.bulletID = bulletID;
      io.emit('bullet',data);
    })

    socket.on('click', function(data) {
        console.log(data);
    });


    socket.on('playerJoined', function(data) {
        var player = new dataFile.playerData();
        player.initialize(socket.id);
        players.push(player);
        socket.emit('playerID',socket.id)
        socket.emit('unitData',units);
        console.log(units);
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
              unit.targetID = info.targetID;
            }
          })
      })
    })


    socket.on('healthUpdate',function(data){
      units.forEach(function(unit,index){
        if(unit.id == data.id){
          unit.health -= data.damage;
        }
      })
      io.emit('healthUpdate',data);
    })

    socket.on('createUnit', function(data) {
        console.log('unit created');
        var unitID = (Math.random() * (1000000 - 100)) + 100;
        var randX = Math.random() * (300 - 100) + 100;
        var randY = Math.random() * (300 - 100) + 100;
        console.log(unitID);
        //var unit = new dataFile.unitData();
        //unit.initialize(unitID, socket.id,randX,randY);
        var unit = {
          unitID: unitID,
          playerID: socket.id,
          x: randX,
          y: randY,
          targetID: null,
          health: 100
        }
        units.push(unit);
        io.emit('createUnit', {
            uID: unitID,
            playerID: socket.id,
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
