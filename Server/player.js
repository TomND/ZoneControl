exports.playerData = function(){

  var playerID;
  var units = [];
  var ip;


  this.initialize = function(id){

    playerID = Math.random() * (1000000 - 100) + 100;

  }



}


exports.unitData = function(){

  this.unitID;
  this.playerID;
  this.x;
  this.y;


  this.initialize = function(uid,pid,newX,newY){
    this.unitID = uid;
    this.playerID = pid;
    this.x = newX;
    this.y = newY;
  }

  this.updatePosition = function(newX,newY){
    this.x = newX;
    this.y = newY;
  }


}
