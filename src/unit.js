/*
* Unit objeect. contains everything unit. each unit is a object of this class
*/
function Unit(theGame, theController, thehealthBar){
  var game = theGame;
  var controller = theController;
  var healthBar = thehealthBar;
  var unitObject;
  var mine;
  var speed = 100;
  var targetX;
  var targetY;
  var health = 75;
  var id;


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

  this.getTarget = function(){
    return{
      x: targetX,
      y: targetY
    };
  };

  //initializes unit.
  this.initialize = function(spawnX,spawnY){
    unitObject = game.add.sprite(spawnX, spawnY, 'unit');
    unitObject.inputEnabled = true;
    game.physics.enable(unitObject, Phaser.Physics.ARCADE);
    unitObject.events.onInputDown.add(function(image) {
        controller.addToSelected(image, this);
    }, this);
    healthBar.initialize(spawnX,spawnY);
    id = 1;// = Math.random() * (10000 - 1) + 1;
  }

  this.GetPosition = function(){
    var x = unitObject.body.position.x;
    var y = unitObject.body.position.y;
    return{
      x:x,
      y:y
    }
  }

  function GetPositionPrivate(){
    var xx = unitObject.body.position.x;
    var yy = unitObject.body.position.y;
    return{
      x:xx,
      y:yy
    }
  }

  // processes movement
  this.move = function(){
    //console.log(this.controller.mouseX);
    if (targetX == null || targetY == null || new Phaser.Rectangle(targetX, targetY, 10, 10).intersects(unitObject.body)) {
        unitObject.body.velocity.setTo(0, 0);
    } else {

        game.physics.arcade.moveToXY(unitObject, targetX, targetY, speed);
        //console.log("moving");
    }
    //console.log(health + "the leead")
    healthBar.healthBarManager(GetPositionPrivate().x,GetPositionPrivate().y,health);

  }


}

function UnitHealthBar(theGame){
  var game = theGame;
  var healthBackgroundSprite;
  var HealthIndicatorSprite;
  var yAdditive = 10;

  this.initialize = function(x,y){
    healthBackgroundSprite = game.add.sprite(x, y + 35, 'healthBackground');
    HealthIndicatorSprite = game.add.sprite(x, y + 35, 'healthIndicator');
    console.log(y);
  }

  this.healthBarManager = function(x,y,health){
    ManagePosition(x,y);
    ManageHealthBar(health);
  }

  function ManagePosition(x,y){
    healthBackgroundSprite.position.x = x;
    healthBackgroundSprite.position.y = y - yAdditive;
    HealthIndicatorSprite.position.x = x;
    HealthIndicatorSprite.position.y = y - yAdditive;
  }

  function ManageHealthBar(health){
    HealthIndicatorSprite.scale.x = health/100;
  }

}


//manages all units.
//@type theGame: Game
//@type theController: Controller
function UnitManager(theGame,theController){

  var game = theGame;
  var controller = theController;
  var units = [];
  game.input.activePointer.leftButton.onDown.add(controller.clickDragStart, this);
  game.input.activePointer.leftButton.onUp.add(clickDragStop, this);

  function sendControllerSelf(){
    controller.getUnitManager(this);
  }

  this.getUnits = function(){
    return units;
  }

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
    healthBar = new UnitHealthBar(game);
    var newUnit = new Unit(game,controller, healthBar);
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
  function clickDragStop(){
    controller.resetSelected();
    var rect = controller.returnSelectionBox();
    returnSelected(rect);
    controller.disableSelectionBox();
  }


}
