

function Unit(){


  var unitObject;

  this.unitObjPublic = function(){return unitObject};

  Unit.prototype.initialize = function(){
    unitObject = game.add.sprite(200,200,'unit');
    unitObject.inputEnabled = true;
    game.physics.enable(unit, Phaser.Physics.ARCADE);
    unit.events.onInputDown.add(function(image){WriteToConsole(image, "Parameter passed")}, this);

  }

  Unit.prototype.test = function(){
    console.log("this is a test");
  }

  Unit.prototype.Move = function(){
    //if(game.physics.arcade.distanceToXY(item,mouseX,mouseY) > 5){
      if(new Phaser.Rectangle(mouseX,mouseY,10,10).intersects(unitObject.body)){//Phaser.Rectangle.containsRect(item.body, new Phaser.Rectangle(mouseX,mouseY,10,10))){
        unitObject.body.velocity.setTo(0, 0);
      }
      else{
        game.physics.arcade.moveToXY(unitObject,mouseX,mouseY,100);
      }
  }




}
