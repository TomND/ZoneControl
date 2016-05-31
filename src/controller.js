
function Controller(theGame){
  var that = this;
  var game = theGame;
  var mouseX; //deprecated
  var mouseY; // deprecated
  var selected = [];
  game.input.activePointer.rightButton.onUp.add(unitDestination, this);
  var selectionBox;
  var dragging = false;
  var dragStartX;
  var dragStartY;

  function unitDestination(){
    console.log(selected);
    var x = game.input.activePointer.position.x;
    var y = game.input.activePointer.position.y;
    selected.forEach(function(subUnit,index){
      console.log(subUnit);
      subUnit.setTarget(x,y);
    })
    //mouseX = game.input.activePointer.position.x;
    //mouseY = game.input.activePointer.position.y;
  }
/*
  var unitDestination = function(){
    mouseX = game.input.activePointer.position.x;
    mouseY = game.input.activePointer.position.y;
    return 1
  }*/

  this.getMousePosition = function(){
    curMouseX = game.input.activePointer.position.x;
    curMouseY = game.input.activePointer.position.y;
    return{
      X: curMouseX,
      Y: curMouseY
    };
  }

  this.addToSelected = function(image,newUnit){
    console.log("push to selected "+ newUnit);
    selected.push(newUnit);

  }

  this.clickDragStart = function(){
    dragStartX = this.getMousePosition().X;
    dragStartY = this.getMousePosition().Y;
    selectionBox = game.add.sprite(dragStartX,dragStartY,'selectionBox');
    selectionBox.alpha = 0.2;
    game.physics.enable(selectionBox, Phaser.Physics.ARCADE);
    dragging = true;
  }

  this.clickDragHold = function(){
    if(dragging){
        var width = dragStartX - this.getMousePosition().X;
        var scaleX = width/10;
        var height = dragStartY - this.getMousePosition().Y;
        var scaleY = height/10;
        selectionBox.scale.setTo(-scaleX,-scaleY);
    }
  }

  this.returnSelectionBox = function(){
    return selectionBox;
  }
  this.disableSelectionBox = function(){
    dragging = false;
    selectionBox.position.x = 200000;
    //selectionBox = null;
  }

  this.update = function(){
    this.clickDragHold();
  }

}

/*
//Deals with control inputs from the player
var Controller = function(theGame) {
    this.game = theGame;
    this.mouseX;
    this.mouseY;
    this.selected = [];
    this.game.input.activePointer.rightButton.onUp.add(this.unitDestination, this);
    this.selectionBox;
    this.dragging = false;
}
//sets mouse x,y coordinates. the destination for the units
Controller.prototype.unitDestination = function() {
    this.mouseX = this.game.input.activePointer.position.x;
    this.mouseY = this.game.input.activePointer.position.y;
}

Controller.prototype.getMousePosition = function(){
  mouseX = this.game.input.activePointer.position.x;
  mouseY = this.game.input.activePointer.position.y;
  return{
    mouseX: mouseX,
    mouseY: mouseY
  };
}

//adds clicked on units to selected array
Controller.prototype.addToSelected = function(image,newUnit) {
    this.selected.push(newUnit);
}
//resets selected to blank array
Controller.prototype.resetSelected = function() {
    selected = [];
}


Controller.prototype.clickDragStart = function(){
  this.dragStartX = this.getMousePosition().mouseX;
  console.log(this.dragStartX)
  this.dragStartY = this.getMousePosition().mouseY;
  this.selectionBox = this.game.add.sprite(this.dragStartX,this.dragStartY,'selectionBox');
  this.selectionBox.alpha = 0.2;
  this.game.physics.enable(this.selectionBox, Phaser.Physics.ARCADE);
  this.dragging = true;
}

Controller.prototype.clickDragHold = function(){
  if(this.dragging){
      var width = this.dragStartX - this.getMousePosition().mouseX;
      console.log(this.getMousePosition().mouseX);
      var scaleX = width/10;
      var height = this.dragStartY - this.getMousePosition().mouseY;
      var scaleY = height/10;
      this.selectionBox.scale.setTo(-scaleX,-scaleY);
  }

}

Controller.prototype.clickDragStop = function(){
  console.log(game.wtf);
  var unitManager = this.game.returnUnitManager();
  unitManager.returnSelected();
  this.selectionBox = null;
}

Controller.prototype.update = function(){
   this.clickDragHold();
}*/
