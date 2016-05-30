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
  var unitManager = this.game.returnUnitManager;
  console.log(this.game.returnUnitManager);
  unitManager.returnSelected();
  this.selectionBox = null;
}

Controller.prototype.update = function(){
   this.clickDragHold();
}
