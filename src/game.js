
// heart of the games code. the scene, resource loading,
// all important functions taht arn't related to a specific task
function Game(){

  this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  // preload function of Phaser. consult phaser API for more info
  function preload(){
    game.load.image('background', 'assets/BackgroundTest.png');
    game.load.image('castle', 'assets/CastleTest.png');
    game.load.image('unit', 'assets/UnitTest.png');
  }

  // create function of Phaser. consult phaser API for more info
  function create(){
    game.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };
    map = game.add.sprite(0, 0, 'background');
    castle = game.add.sprite(350, 350, 'castle');
    map.inputEnabled = true;
  }

  // update function of Phaser. consult phaser API for more info
  function update(){

  }










}
