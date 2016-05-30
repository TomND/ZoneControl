// a unit object.
var Unit = function(theGame,theController){
  this.game = theGame;
  this.controller = theController;
  this.unitObject;
  this.mine;
  this.speed = 100;
}
//initializes a unit
Unit.prototype.initialize = function(spawnX,spawnY){
  this.unitObject = this.game.add.sprite(spawnX, spawnY, 'unit');
  this.unitObject.inputEnabled = true;
  this.game.physics.enable(this.unitObject, Phaser.Physics.ARCADE);
  this.unitObject.events.onInputDown.add(function(image) {
      this.controller.addToSelected(image, this);
  }, this);
}

Unit.prototype.move = function(){
  //console.log(this.controller.mouseX);
  if (new Phaser.Rectangle(this.controller.mouseX, this.controller.mouseY, 10, 10).intersects(this.unitObject.body)) {
      this.unitObject.body.velocity.setTo(0, 0);
  } else {
      this.game.physics.arcade.moveToXY(this.unitObject, this.controller.mouseX, this.controller.mouseY, this.speed);
  }
}



//unit manager, manages units processing like movement
var UnitManager = function(theGame, theController){
  this.game = theGame;
  this.controller = theController;
  this.units = [];
}

//processes movement of all units
UnitManager.prototype.processMovement = function(){

  this.units.forEach(function(subUnit, index) {
      if (subUnit != undefined) {
          subUnit.move();
      }

  })

}

//creates units
UnitManager.prototype.createUnit = function(spawnX,spawnY){
  var newUnit = new Unit(this.game,this.controller);
  newUnit.initialize(spawnX, spawnY);
  this.units.push(newUnit);
}

UnitManager.prototype.returnSelected = function(rect){
  var intersection = [];
  this.units.forEach(function(subUnit,index){
    if(rect.intersects(subUnit.body)){
        this.controller.addToSelected(subUnit);
    }
  })
}
