
/*
* Handles all controls for the game.
*/
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

  //sets the x,y coordinate destination for each selected unit
  function unitDestination(){
    console.log(selected);
    var x = game.input.activePointer.position.x;
    var y = game.input.activePointer.position.y;
    selected.forEach(function(subUnit,index){
      console.log(subUnit);
      subUnit.setTarget(x,y);
    })
  }

  //returns mouse position
  this.getMousePosition = function(){
    curMouseX = game.input.activePointer.position.x;
    curMouseY = game.input.activePointer.position.y;
    return{
      X: curMouseX,
      Y: curMouseY
    };
  }

  // adds a unit to selected array
  /*
  * @type newUnit: Unit
  * @type image: image of prev class, ignore
  */
  this.addToSelected = function(image,newUnit){
    console.log("push to selected "+ newUnit);
    selected.push(newUnit);

  }

  // resets selected
  this.resetSelected = function(){
    selected = [];
  }

  //sets click drag parameters
  this.clickDragStart = function(){
    dragStartX = this.getMousePosition().X;
    dragStartY = this.getMousePosition().Y;
    selectionBox = game.add.sprite(dragStartX,dragStartY,'selectionBox');
    selectionBox.alpha = 0.2;
    game.physics.enable(selectionBox, Phaser.Physics.ARCADE);
    dragging = true;
  }

  // processes scale and sets click drag box size accordingly
  this.clickDragHold = function(){
    if(dragging){
        var width = dragStartX - this.getMousePosition().X;
        var scaleX = width/10;
        var height = dragStartY - this.getMousePosition().Y;
        var scaleY = height/10;
        selectionBox.scale.setTo(-scaleX,-scaleY);
    }
  }

  // returns selectionBox
  // @rtype: unit array
  this.returnSelectionBox = function(){
    return selectionBox;
  }
  //disables selection box
  this.disableSelectionBox = function(){
    dragging = false;
    selectionBox.position.x = 200000;
    //selectionBox = null;
  }
  //updates selection box
  this.update = function(){
    this.clickDragHold();
  }

}
