//Deals with control inputs from the player
var Controller = function(theGame) {
    this.game = theGame;
    this.mouseX;
    this.mouseY;
    this.selected = [];
    this.game.input.activePointer.rightButton.onUp.add(this.unitDestination, this);
}
//sets mouse x,y coordinates. the destination for the units
Controller.prototype.unitDestination = function() {
    this.mouseX = this.game.input.activePointer.position.x;
    this.mouseY = this.game.input.activePointer.position.y;
}
//adds clicked on units to selected array
Controller.prototype.addToSelected = function(image,newUnit) {
    this.selected.push(newUnit);
}
//resets selected to blank array
Controller.prototype.resetSelected = function() {
    selected = [];
}
