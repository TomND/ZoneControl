exports.playerData = function(){

  var playerID;
  var units = [];
  var ip;


  this.initialize = function(id){

    playerID = Math.random() * (1000000 - 100) + 100;

  }



}

/*
exports.unitData = function(){

  var unitID;
  var playerID;
  var x;
  var y;
  this.test = 1;

this.getPosition = function() {
    return{
      x: x,
      y: y
    };

}

this.getunitID = function(){
  return unitID;
}

this.getPlayerID = function(){
  return playerID;
}


  this.initialize = function(uid,pid,newX,newY){
    unitID = uid;
    playerID = pid;
    x = newX;
    y = newY;
  }

  this.updatePosition = function(newX,newY){
    x = newX;
    y = newY;
  }


}*/
