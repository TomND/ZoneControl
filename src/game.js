
// heart of the games code. the scene, resource loading,
// all important functions taht arn't related to a specific task

function Game(){

  var map;
  var castle;
  var unitManager;
  var controller;
  var client;
  //var config = {  forceSetTimeOut: true,  renderer: Phaser.AUTO,  width: 1000,  height: 700};

  //var socket = io.connect('http://localhost:3000');


  var game = new Phaser.Game(2000, 900, Phaser.AUTO, '', {
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
    game.load.image('healthBackground', 'assets/HealthBackGround.png');
    game.load.image('healthIndicator', 'assets/HealthIndicator.png');
    game.load.image('bullet','assets/BulletTest.png');

  }

  // create function of Phaser. consult phaser API for more info
  function create(){
    game.stage.disableVisibilityChange = true;
    client = new Client();
    //disables right click menu in browser
    game.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };

    map = game.add.sprite(0, 0, 'background');
    castle = game.add.sprite(350, 350, 'castle');

    map.inputEnabled = true;
    castle.inputEnabled = true;

    controller = new Controller(game,client);
    unitManager = new UnitManager(game,controller);
    client.initialize(unitManager);




  }

  // update function of Phaser. consult phaser API for more info
  function update(){
    unitManager.processMovement();
    unitManager.processClicks();
    controller.update();
    client.listen();
    client.updateUnitData();
    if(map.input.pointerDown()){
      if(this.input.activePointer.button === Phaser.Mouse.LEFT_BUTTON){
      //  console.log("gottem");
        //socket.emit('click','click');
      }

    }




  }




}
