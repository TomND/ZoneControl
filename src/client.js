function Client(){

  //var main;
  var units;
  var unitMan;
  this.socket = io.connect('http://localhost:3000');

  this.initialize = function(unitManager){
    unitMan = unitManager;
    units = unitManager.getUnits();
    console.log(unitMan);
    //socket.emit('GetUnits',units);
  }


  this.SendPositionChange = function(){
    units = unitManager.units;
    //socket.emit('UnitChange',units);
  }

  this.listen = function(){


    this.socket.on('UnitUpdate',function(data){
        units.forEach(function(subUnit,index){
          if(subUnit.id == data.id){
             subUnit.setTarget(data.x,data.y);
             console.log(data.x);
          }
        })
    });



  }


}
