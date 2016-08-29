function Client() {

    var playerID;
    //var main;
    var units;
    var unitManager;
    var timeInterval = 100;
    var lastTime = 0;
    this.socket = io.connect('http://localhost:3000');

    this.initialize = function(theunitManager) {
        unitManager = theunitManager;
        unitManager.setClient(this);
        units = unitManager.getUnits();
        console.log(unitManager);
        this.socket.emit('playerJoined');
        this.socket.emit('createUnit');
    }


    this.SendPositionChange = function() {
        units = unitManager.units;
        //socket.emit('UnitChange',units);
    }

    this.listen = function() {

        this.socket.on('playerID',function(data){
          playerID = data;
        })

        this.socket.on('bullet', function(data) {
            var duplicate = false;
            unitManager.getUnits().forEach(function(unit, index) {
                if (unit.getID() == data.id) {

                    unit.getBullets().forEach(function(bullet,index){
                      if(bullet.getID() == data.bulletID){
                        duplicate = true;
                        console.log('duplicate found')
                      }
                    });

                    /*var theTarget;
                    unitManager.getUnits().forEach(function(unittarg, index1) {
                        if (unittarg.getID() == data.target) {
                            theTarget = unittarg;
                        }
                    })*/
                    var theTarget = unitManager.getUnitByID(data.target)
                    console.log(theTarget + 'is the target OK?');
                    if(duplicate == false){
                      console.log("createBullet");
                      unit.createBullet(data.x, data.y, theTarget,data.bulletID);
                    }

                }
            })
        })

        this.socket.on('healthUpdate',function(data){
          console.log(data.id)
          unitManager.getUnitByID(data.id).takeDamage(data.damage)
        })

        this.socket.on('newTarget',function(data){
          unitManager.getUnits().forEach(function(unit,index){
            if(unit.getID() == data.unitID){
              var target = unitManager.getUnitByID(data.targetID)
              unit.setEnemy(target);

            }
          })
        })

        this.socket.on('disconnect', function(data) {
            unitManager.destroyUnit(data);
        })

        this.socket.on('UnitUpdate', function(data) {
            units.forEach(function(subUnit, index) {
                if (subUnit.getID() == data.id) {
                    subUnit.setTarget(data.x, data.y);

                }
            })
        });

        this.socket.on('createUnit', function(data) {
            var mine;
            if(data.playerID == playerID){
              mine = true;
            }
            else {
              mine = false;
            }
            unitManager.createUnit(data.x, data.y, data.uID, mine);
        });

        this.socket.on('unitData', function(data) {
            console.log('unitdata received');
            console.log(data);
            data.forEach(function(unit, index) {
                console.log(unit.x);
                unitManager.createUnit(unit.x, unit.y, unit.unitID, false);
            })
        });

    }

    this.updateUnitData = function() {
        var time = new Date();
        if (time - lastTime > timeInterval) {
            lastTime = new Date();
            var units = unitManager.getMine();
            this.socket.emit('positionUpdate', units);
        }
    }

    this.createUnit = function() {

        this.socket.emit('CreateUnit', playerID);
    }


}
