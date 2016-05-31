
// heart of the games code. the scene, resource loading,
// all important functions taht arn't related to a specific task

function Game(){

  var map;
  var castle;
  var unitManager;
  var controller;

  function getUnitManager(){
    return 7;
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });




  // preload function of Phaser. consult phaser API for more info
  function preload(){
    game.load.image('background', 'assets/BackgroundTest.png');
    game.load.image('castle', 'assets/castleTest.png');
    game.load.image('unit', 'assets/UnitTest.png');
    game.load.image('selectionBox', 'assets/selectionBox.png');
  }

  // create function of Phaser. consult phaser API for more info
  function create(){
    //disables right click menu in browser
    game.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };

    map = game.add.sprite(0, 0, 'background');
    castle = game.add.sprite(350, 350, 'castle');

    map.inputEnabled = true;

    controller = new Controller(game);
    unitManager = new UnitManager(game,controller);
    unitManager.createUnit(200,200);
    unitManager.createUnit(300,300);


    map.events.onInputDown.add(function(image) {
        controller.clickDragStart();
    }, this);
    map.events.onInputUp.add(function(image) {
        unitManager.clickDragStop();
    }, this);


  }

  // update function of Phaser. consult phaser API for more info
  function update(){
    unitManager.processMovement();
    controller.update();
  }




}


//Potential different way to organize this class. left incase I decide to do things differently.  feel free to just ignore this for now.

/*var Game = new function(){

  var map;
  var castle;



  this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  var unitManager = new UnitManager(game);
}

Game.prototype.preload = function(){
  this.game.load.image('background', 'assets/BackgroundTest.png');
  this.game.load.image('castle', 'assets/CastleTest.png');
  this.game.load.image('unit', 'assets/UnitTest.png');
}


Game.prototype.create = function(){
  //disables right click menu in browser
  this.game.canvas.oncontextmenu = function(e) {
    e.preventDefault();
  };

  map = this.game.add.sprite(0, 0, 'background');
  castle = this.game.add.sprite(350, 350, 'castle');

  map.inputEnabled = true;

  unitManager.createUnit(200,200);
}

Game.prototype.update = function(){
  UnitManager.processMovement();
}*/
