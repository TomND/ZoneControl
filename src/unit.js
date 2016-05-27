

function Unit(){


  var unitObject;

  this.unitObjPublic = function(){return unitObject};

  Unit.prototype.initialize = function(){
    unitObject = game.add.sprite(200,200,'unit');
    unitObject.inputEnabled = true;
    unit.events.onInputDown.add(function(image){WriteToConsole(image, "Parameter passed")}, this);

  }

  Unit.prototype.test = function(){
    console.log("this is a test");
  }




}
