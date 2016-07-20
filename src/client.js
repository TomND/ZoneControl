function Client(){

  var playerID;
  //var main;
  var units;
  var unitManager;
  var timeInterval = 100;
  var lastTime = 0;
  this.socket = io.connect('http://localhost:3000');

  this.initialize = function(theunitManager){
    unitManager = theunitManager;
    units = unitManager.getUnits();
    console.log(unitManager);
    this.socket.emit('playerJoined');
    this.socket.emit('createUnit');
  }


  this.SendPositionChange = function(){
    units = unitManager.units;
    //socket.emit('UnitChange',units);
  }

  this.listen = function(){

    this.socket.on('disconnect',function(data){
      unitManager.destroyUnit(data);
    })

    this.socket.on('UnitUpdate',function(data){
        units.forEach(function(subUnit,index){
          if(subUnit.getID() == data.id){
             subUnit.setTarget(data.x,data.y);

          }
        })
    });

    this.socket.on('createUnit',function(data){
        unitManager.createUnit(data.x,data.y,data.uID,true);
    });

    this.socket.on('unitData',function(data){
      console.log('unitdata received');
      data.forEach(function(unit,index){
        unitManager.createUnit(unit.x,unit.y,unit.unitID,false);
      })
    });

  }

  this.updateUnitData = function(){
    var time = new Date();
    if(time - lastTime > timeInterval){
      lastTime = new Date();
      var units = unitManager.getMine();
      this.socket.emit('positionUpdate',units);
    }
  }

  this.createUnit = function(){

    this.socket.emit('CreateUnit',playerID);
  }


}
