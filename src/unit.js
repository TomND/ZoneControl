/*
* Unit objeect. contains everything unit. each unit is a object of this class
*/
function Unit(theGame, theController){
  var game = theGame;
  var controller = theController;
  var unitObject;
  var mine;
  var speed = 100;
  var targetX;
  var targetY;

  //returns the phaser unit object unitObject
  //@rtype unitObject: sprite
  this.unit = function(){
    return unitObject;
  }

  // sets targetx/y
  this.setTarget = function(x,y){
    targetX = x;
    targetY = y;
  }

  //initializes unit.
  this.initialize = function(spawnX,spawnY){
    unitObject = game.add.sprite(spawnX, spawnY, 'unit');
    unitObject.inputEnabled = true;
    game.physics.enable(unitObject, Phaser.Physics.ARCADE);
    unitObject.events.onInputDown.add(function(image) {
        controller.addToSelected(image, this);
    }, this);
  }

  // processes movement
  this.move = function(){
    //console.log(this.controller.mouseX);
    console.log(targetX);
    if (targetX == null || targetY == null || new Phaser.Rectangle(targetX, targetY, 10, 10).intersects(unitObject.body)) {
        unitObject.body.velocity.setTo(0, 0);
    } else {

        game.physics.arcade.moveToXY(unitObject, targetX, targetY, speed);
        console.log("moving");
    }
  }


}


//manages all units.
//@type theGame: Game
//@type theController: Controller
function UnitManager(theGame,theController){

  var game = theGame;
  var controller = theController;
  var units = [];

  //calls move for each unit
  this.processMovement = function(){
    units.forEach(function(subUnit, index) {
        if (subUnit != undefined) {
            subUnit.move();
        }

    })
  }
  //creates a new unit and stores in units;
  //@type spawnX: int
  //@type spawnY: int
  this.createUnit = function(spawnX,spawnY){
    var newUnit = new Unit(game,controller);
    newUnit.initialize(spawnX, spawnY);
    units.push(newUnit);
  }

  //returns all units overlapping rect
  function returnSelected(rect){
    units.forEach(function(subUnit,index){
      if(rect.overlap(subUnit.unit())){
          controller.addToSelected(null,subUnit);
      }
    })
  }
  // gets called when clickDragStops
  this.clickDragStop = function(){
    controller.resetSelected();
    var rect = controller.returnSelectionBox();
    returnSelected(rect);
    controller.disableSelectionBox();
  }


}
