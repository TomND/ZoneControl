/*
 * Unit objeect. contains everything unit. each unit is a object of this class
 */
function Unit(theGame, theController, thehealthBar, theClient) {
    var client = theClient;
    var game = theGame;
    var controller = theController;
    var healthBar = thehealthBar;
    var unitObject;
    var speed = 100;
    var targetX;
    var targetY;
    var health = 100;
    var id;
    var mine;
    var enemy;
    var distanceToAttack = 150;
    bullets = [];
    var fireRate = 1000;
    var lastFire = 0;


    //returns the phaser unit object unitObject
    //@rtype unitObject: sprite
    this.unit = function() {
        return unitObject;
    }

    this.destroySprites = function() {
        unitObject.destroy();
        healthBar.destroySprites();
    }

    // sets targetx/y
    this.setTarget = function(x, y) {
        targetX = x;
        targetY = y;
    }

    this.getHealth = function() {
        return health;
    }


    this.getTarget = function() {
        return {
            x: targetX,
            y: targetY
        };
    };

    this.getBullets = function() {
        return bullets;
    }

    this.getTargetID = function(target) {
        if (target == null) {
            return null
        } else {
            return target.getID();
        }
    }

    this.isMine = function() {
        return mine;
    }

    this.getEnemy = function() {
        return enemy;
    }

    this.setEnemy = function(newEnemy) {
        console.log(newEnemy + 'is the new enemyt')
        enemy = newEnemy;
    }

    function getTargetIDPrivate(target) {
        if (target == null) {
            return null
        } else {
            return target.getID();
        }
    }

    function getEnemyID() {
        return enemy.getID();

    }


    this.getID = function() {
        return id;
    }

    //initializes unit.
    this.initialize = function(spawnX, spawnY, uid, isMine) {
        unitObject = game.add.sprite(spawnX, spawnY, 'unit');
        unitObject.inputEnabled = true;
        game.physics.enable(unitObject, Phaser.Physics.ARCADE);
        /*unitObject.events.onInputDown.add(function(image) {
            controller.addToSelected(image, this);
        }, this);*/
        healthBar.initialize(spawnX, spawnY);
        id = uid; // = Math.random() * (10000 - 1) + 1;
        console.log(isMine)
        mine = isMine;
    }

    var setMine = function(isMine) {
        if (isMine == true) {
            mine = true;
        } else {
            mine = false;
        }
    }

    this.GetPosition = function() {
        var x = unitObject.body.position.x;
        var y = unitObject.body.position.y;
        return {
            x: x,
            y: y
        }
    }

    function GetPositionPrivate() {
        var xx = unitObject.body.position.x;
        var yy = unitObject.body.position.y;
        return {
            x: xx,
            y: yy
        }
    }

    function attack(targetUnit) {
    	if (mine == false){
    		return
    	}
        var unitTarget = targetUnit;
        var time = new Date()
        if (time - lastFire > fireRate) {
            lastFire = new Date();
            //var bullet = new Bullet(game, GetPositionPrivate().x, GetPositionPrivate().y);
            //bullet.initialize(unitTarget);
            console.log('emiting bullet info')
            client.socket.emit('bullet', {
                id: id,
                x: GetPositionPrivate().x,
                y: GetPositionPrivate().y,
                target: enemy.getID()
            });

        }

    }



    // check for bullet collision and call bullet movement
    this.processBullets = function(units) {

        if (bullets == null) {

            return;
        }
        bullets.forEach(function(bullet, bIndex) {
            units.forEach(function(unit, index) {
                if (bullet.getBulletObject().body == null || unit.unit().body == null) {
                    return;
                }
                if(unit.getID() == id){
                	return;
                }
                console.log(enemy != null)
                if (Phaser.Rectangle.intersects(bullet.getBulletObject().body, unit.unit().body) && ((mine == true &&unit.isMine() == false) || (mine == false && unit.isMine() == true)) && enemy != null) {
                    //console.log(unit.getID());
                    //console.log(id);
                    console.log('we are here')
                    if (mine == true) {
                        giveDamage(bullet.getDamage());
                        console.log('giving damage')
                    }
                    console.log('destroy')
                    bullet.getBulletObject().destroy();
                    bullets.splice(bIndex, 1);
                } else {
                    bullet.move();
                }
            })
        })
    }

    this.createBullet = function(x, y, target, theID) {
        console.log('bulletcreated');
        var bullet = new Bullet(game, x, y, theID);
        bullet.initialize(target);
        bullets.push(bullet);
    }

    this.takeDamage = function(damage) {
        health -= damage;
        console.log('hut');
    }

    function giveDamage(damage) {
        console.log(enemy + ' is the ENENENENNENENENENENNNENNENENMY');
        client.socket.emit('healthUpdate', {
            id: getEnemyID(),
            damage: damage
        })
    }

    /*  this.hit = function(damage) {
          console.log('send hut')
          console.log(getUnitTarget() + "asdasdasdasdasdasdasdasdasdasdasdasdasd");
          client.socket.emit('healthUpdate', {
              id: id,
              damage: damage
          })
      }*/

    // processes movement
    this.move = function() {
        //console.log(this.controller.mouseX);
        if (targetX == null || targetY == null || new Phaser.Rectangle(targetX, targetY, 10, 10).intersects(unitObject.body)) {
            unitObject.body.velocity.setTo(0, 0);
        } else {
            //console.log(target)
            if (enemy != null) {
                //console.log(game.physics.arcade.distanceBetween(unitObject, this.unitTarget.unit()))
                //console.log(game.physics.arcade.distanceBetween(unitObject, this.unitTarget.unit()));
            }
            if (enemy != null && game.physics.arcade.distanceBetween(unitObject, enemy.unit()) < distanceToAttack) {

                if (enemy.getHealth() <= 0) {
                    bullets.forEach(function(bullet, index) {
                        bullet.removeTarget();
                    })
                    enemy = null;
                } else {
                    attack(enemy);
                }

                unitObject.body.velocity.setTo(0, 0);
                //console.log('attacking');
            } else {
                game.physics.arcade.moveToXY(unitObject, targetX, targetY, speed);
            }

            //console.log("moving");
        }
        healthBar.healthBarManager(GetPositionPrivate().x, GetPositionPrivate().y, health);

    }

}

function Bullet(theGame, spawnX, spawnY, theID) {

    var bulletID = theID;
    var game = theGame;
    var bulletObject;
    var damage = 25;
    var speed = 100;
    var x = spawnX;
    var y = spawnY;
    var targetUnit;
    var targetX;
    var targetY;


    this.getID = function() {
        return bulletID;
    }


    this.getDamage = function() {
        return damage;
    }

    this.getBulletObject = function() {
        return bulletObject;
    }

    this.removeTarget = function() {
        targetUnit = null;
    }


    this.initialize = function(unitTarget) {
        var bullet = game.add.sprite(x, y, 'bullet');
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bulletObject = bullet;
        targetUnit = unitTarget;
        targetX = getTargetPosition().x;
        targetY = getTargetPosition().y;
        //console.log('getting called');
    }


    this.move = function() {
      console.log('moving')
        if (targetUnit == null || (targetUnit.unit().body == null && game.physics.arcade.distanceBetween(targetUnit.unit(), bulletObject) < 10)) {
            bulletObject.destroy();
            console.log('ISSUEEEEEEE')
        } else {
            game.physics.arcade.moveToXY(bulletObject, targetX, targetY, speed);
        }

    }

    function getTargetPosition() {
        if (targetUnit == null || targetUnit.unit().body == null) {
            console.log('prevent this text from logging else shit code')
            return {
                x: 0,
                y: 0
            };
        }
        var xx = targetUnit.unit().body.position.x;
        var yy = targetUnit.unit().body.position.y;
        return {
            x: xx,
            y: yy
        }
    }

}

function UnitHealthBar(theGame) {
    var game = theGame;
    var healthBackgroundSprite;
    var HealthIndicatorSprite;
    var yAdditive = 10;

    this.destroySprites = function() {
        healthBackgroundSprite.destroy();
        HealthIndicatorSprite.destroy();
    }

    this.initialize = function(x, y) {
        healthBackgroundSprite = game.add.sprite(x, y + 35, 'healthBackground');
        HealthIndicatorSprite = game.add.sprite(x, y + 35, 'healthIndicator');
        //console.log(y);
    }

    this.healthBarManager = function(x, y, health) {
        ManagePosition(x, y);
        ManageHealthBar(health);
    }

    function ManagePosition(x, y) {
        healthBackgroundSprite.position.x = x;
        healthBackgroundSprite.position.y = y - yAdditive;
        HealthIndicatorSprite.position.x = x;
        HealthIndicatorSprite.position.y = y - yAdditive;
    }

    function ManageHealthBar(health) {

        HealthIndicatorSprite.scale.x = health / 100;


    }

}


//manages all units.
//@type theGame: Game
//@type theController: Controller
function UnitManager(theGame, theController) {

    var game = theGame;
    var controller = theController;
    var units = [];
    var client;
    game.input.activePointer.leftButton.onDown.add(controller.clickDragStart, this);
    game.input.activePointer.leftButton.onUp.add(clickDragStop, this);

    function sendControllerSelf() {
        controller.getUnitManager(this);
    }

    this.setClient = function(theClient) {
        client = theClient;
    }

    this.getClient = function() {
        return client;
    }

    this.getUnitByID = function(id) {
        var theUnit;
        units.forEach(function(unit, index) {
            if (unit.getID() == id) {
                theUnit = unit;
                return;
            }
        })
        return theUnit;
    }

    this.getUnits = function() {
        return units;
    }

    this.destroyUnit = function(unitID) {
        units.forEach(function(unit, index) {
            if (unit.getID() == unitID) {
                unit.destroySprites();
                units.splice(index, 1);
                return;
            }
        })
    }

    this.getMine = function() {
        var myUnits = []
        units.forEach(function(unit, index) {
            if (unit.isMine() == true) {
                var info = {
                    unitID: unit.getID(),
                    x: unit.GetPosition().x,
                    y: unit.GetPosition().y,
                    targetID: unit.getTargetID(unit.getEnemy())
                };

                /*function(){
                          this.unitID = unit.getID();
                          this.position = unit.getPosition();
                        }*/
                myUnits.push(info);
            }
        })
        return myUnits;
    }

    //calls move for each unit and processes each units Bullets
    this.processMovement = function() {
        units.forEach(function(subUnit, index) {
            if (subUnit != undefined) {
                if (subUnit.getHealth() <= 0) {
                    client.socket.emit('unitDead', subUnit.getID())
                    subUnit.destroySprites();
                    units.splice(index, 1);

                } else {
                    subUnit.move();
                    subUnit.processBullets(units);
                }

            }

        })
    }

    // handles right clicking targets
    this.processClicks = function() {
        units.forEach(function(subUnit, index) {
            if (subUnit != undefined && subUnit.unit().body != null) {
                if (subUnit.unit().input.pointerDown()) {
                    if (game.input.activePointer.button === Phaser.Mouse.RIGHT_BUTTON) {
                        if (subUnit.isMine() == false) {
                            controller.returnSelected().forEach(function(unit, index) {
                                //unit.unitTarget = subUnit;
                                console.log('newtarget')
                                console.log(subUnit.getID())
                                client.socket.emit('newTarget', {
                                    unitID: unit.getID(),
                                    targetID: subUnit.getID()
                                });
                            })
                        }
                        //socket.emit('click','click');
                    }
                }

            }

        })
    }

    //creates a new unit and stores in units;
    //@type spawnX: int
    //@type spawnY: int
    this.createUnit = function(spawnX, spawnY, uid, mine) {
        /*var clone = false;
        units.forEach(function(unit, index) {
            if (unit.getID() == uid) {
                clone = true;
            }
        })
        if (clone == true) {
            return;
        }*/
        healthBar = new UnitHealthBar(game);
        var newUnit = new Unit(game, controller, healthBar, client);
        newUnit.initialize(spawnX, spawnY, uid, mine);
        units.push(newUnit);
    }

    //returns all units overlapping rect
    function returnSelected(rect) {
        units.forEach(function(subUnit, index) {
            if (rect.overlap(subUnit.unit())) {
                controller.addToSelected(null, subUnit);
            }
        })
    }
    // gets called when clickDragStops
    function clickDragStop() {
        console.log('drag stop')
        controller.resetSelected();
        var rect = controller.returnSelectionBox();
        returnSelected(rect);
        controller.disableSelectionBox();
    }


}
