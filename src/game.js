
// heart of the games code. the scene, resource loading,
// all important functions taht arn't related to a specific task

function Game(){

  var map;
  var castle;



  this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  var unitManager;
  var controller;

  // preload function of Phaser. consult phaser API for more info
  function preload(){
    this.game.load.image('background', 'assets/BackgroundTest.png');
    this.game.load.image('castle', 'assets/CastleTest.png');
    this.game.load.image('unit', 'assets/UnitTest.png');
  }

  // create function of Phaser. consult phaser API for more info
  function create(){
    //disables right click menu in browser
    this.game.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };

    map = this.game.add.sprite(0, 0, 'background');
    castle = this.game.add.sprite(350, 350, 'castle');

    map.inputEnabled = true;

    controller = new Controller(this.game);
    unitManager = new UnitManager(this.game,controller);
    unitManager.createUnit(200,200);
  }

  // update function of Phaser. consult phaser API for more info
  function update(){
    unitManager.processMovement();
    console.log(controller.mouseX);
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
