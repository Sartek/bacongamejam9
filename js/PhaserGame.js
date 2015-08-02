window.onload = function () {
    'use strict';
    var game, w, h, paddleLeft, paddleRight, paddles, wallTop, wallBottom, walls,
        goalLeft, goalRight, goals, ball,
        scoreLeft, scoreRight, scoreDisplay, scoreStyle,
        instructionDisplay, instructionStyle,
        wKey, sKey, upKey, downKey, spacebarKey,
        RNG_GOD, notAI, lagAI, framesAI, paused;
    
    function random(MIN, MAX) {
        var number = RNG_GOD.integerInRange(MIN, MAX);
        if (RNG_GOD.integerInRange(0, 1)) {
            number = number * -1;
        }
        return number;
    }
    
    function togglePause() {
        paused = !paused;
        game.physics.arcade.isPaused = paused;
        if (!paused) {
            instructionDisplay.text = "";
        } else {
            instructionDisplay.text = "Spacebar:pause/unpause W:Up S:Down";
            //instructionDisplay = game.add.text(w / 2, h / 1.5, "Spacebar:pause/unpause W:LeftUp S:LeftDown UP:RightUp DOWN:RightDown", instructionStyle);
            instructionDisplay.anchor.setTo(0.5);
        }
    }
    
    w = 640;
    h = 480;
    
    game = new Phaser.Game(w, h, Phaser.AUTO, '', { preload: preload, create:       create, update: update });

    function preload() {
        game.load.image('ball', 'assets/ball.png');
        game.load.image('goal', 'assets/goal.png');
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('wall', 'assets/wall.png');
    }

    function create() {
        RNG_GOD = new Phaser.RandomDataGenerator(1337);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#000000";
        
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        walls = game.add.group();
        walls.enableBody = true;
        
        wallTop = game.add.sprite(w / 2, 8, 'wall');
        wallTop.anchor.setTo(0.5);
        
        wallBottom = game.add.sprite(w / 2, h - 8, 'wall');
        wallBottom.anchor.setTo(0.5);
        
        walls.add(wallTop);
        walls.add(wallBottom);
        walls.setAll('body.immovable', true);
        
        paddles = game.add.group();
        paddles.enableBody = true;
        
        paddleLeft = game.add.sprite(40, h / 2, 'paddle');
        paddleLeft.anchor.setTo(0.5);
        
        paddleRight = game.add.sprite(w - 40, h / 2, 'paddle');
        paddleRight.anchor.setTo(0.5);
        
        paddles.add(paddleLeft);
        paddles.add(paddleRight);
        paddles.setAll('body.immovable', true);
        
        goals = game.add.group();
        goals.enableBody = true;
        
        goalLeft = game.add.sprite(8, h / 2, 'goal');
        goalLeft.anchor.setTo(0.5);
        
        goalRight = game.add.sprite(w - 8, h / 2, 'goal');
        goalRight.anchor.setTo(0.5);
        
        goals.add(goalLeft);
        goals.add(goalRight);
        goals.setAll('body.immovable', true);
        
        ball = game.add.sprite(w / 2, h / 2, 'ball');
        ball.anchor.setTo(0.5);
        ball.enableBody = true;
        game.physics.arcade.enable(ball);
        ball.body.bounce.set(1);
        ball.body.velocity.y = random(25, 100);
        ball.body.velocity.x = random(200, 300);
        
        scoreRight = 0;
        scoreLeft = 0;
        scoreStyle = { font: "32px Impact", fill: "#ffffff", align: "center" };
        scoreDisplay = game.add.text(w / 2, 32, scoreLeft + "|" + scoreRight, scoreStyle);
        scoreDisplay.anchor.setTo(0.5);
        
        
        instructionStyle = { font: "18px Impact", fill: "#ffffff", align: "center" };
        instructionDisplay = game.add.text(w / 2, h / 1.5, "Spacebar:pause/unpause W:Up S:Down", instructionStyle);
        instructionDisplay.anchor.setTo(0.5);
        
        paused = true;
        notAI = false;
        lagAI = 0;
        framesAI = 6;
        
        game.physics.arcade.isPaused = true;
        
        spacebarKey.onDown.add(function () {
            togglePause();
        });
    }
    
    function score(ball, goal) {
        if (goal.body.position.x == 0) {
            scoreRight += 1;
        } else if (goal.body.position.x == 624) {
            scoreLeft += 1;
        }
        ball.body.position.x = w / 2;
        ball.body.position.y = h / 2;
        ball.body.velocity.y = random(25, 100);
        ball.body.velocity.x = random(200, 300);
        
        scoreDisplay.text = scoreLeft + "|" + scoreRight;
    }

    function update() {
        
        if (!paused) {
            game.physics.arcade.overlap(ball, goals, score, null, this);
            game.physics.arcade.collide(paddles, ball);
            game.physics.arcade.collide(ball, walls);
            game.physics.arcade.collide(ball, goals);
            game.physics.arcade.collide(ball, paddles);
        
            //paddles.setAll('body.velocity.y', 0);
        
            if (wKey.isDown && !sKey.isDown && !(paddleLeft.body.position.y < 20)) {
                paddleLeft.body.velocity.y = -240;
            }
        
            if (sKey.isDown && !wKey.isDown && !(paddleLeft.body.position.y > (h - 68))) {
                paddleLeft.body.velocity.y = 240;
            }
            
            if (!wKey.isDown && paddleLeft.body.position.y > (h - 68)) {
                paddleLeft.body.velocity.y = 0;
            }
            
            if (!sKey.isDown && paddleLeft.body.position.y < 20) {
                paddleLeft.body.velocity.y = 0;
            }
            
            if (!wKey.isDown && !sKey.isDown) {
                paddleLeft.body.velocity.y = 0;
            }
        
            if (notAI) {
                
                if (upKey.isDown && !downKey.isDown && !(paddleRight.body.position.y < 20)) {
                    paddleRight.body.velocity.y = -240;
                }
        
                if (downKey.isDown && !upKey.isDown && !(paddleRight.body.position.y > (h - 68))) {
                    paddleRight.body.velocity.y = 240;
                }
            
                if (!upKey.isDown && paddleRight.body.position.y > (h - 68)) {
                    paddleRight.body.velocity.y = 0;
                }
            
                if (!downKey.isDown && paddleRight.body.position.y < 20) {
                    paddleRight.body.velocity.y = 0;
                }
            
                if (!upKey.isDown && !downKey.isDown) {
                    paddleRight.body.velocity.y = 0;
                }
            } else {
                
                lagAI += 1;
                if (lagAI > framesAI) {
                    lagAI = 0;
                }
                var dirAI;
                
                var targety;
                targety = ball.body.position.y + framesAI / 60 * ball.body.velocity.y;
                //AI LOGIC
                
                if (targety > paddleRight.body.position.y) {
                    dirAI = 1;
                } else if (targety < paddleRight.body.position.y) {
                    dirAI = -1;
                } else {
                    dirAI = 0;
                }
                
                if (ball.body.velocity.x < 0) {
                    dirAI = 0;
                }
                
                //How many frames does the paddle need to move towards the ball to get to the ball target
                
                /*
                if (ball.body.position.y > paddleRight.body.position.y) {
                    dirAI = 1;
                } else if (ball.body.position.y < paddleRight.body.position.y) {
                    dirAI = -1;
                } else {
                    dirAI = 0;
                }
                */
                
                
                if (dirAI == 1 && lagAI == framesAI) {
                    paddleRight.body.velocity.y = 240;
                } else if (dirAI == -1 && lagAI == framesAI) {
                    paddleRight.body.velocity.y = -240;
                } else if (dirAI == 0) {
                    paddleRight.body.velocity.y = 0;
                }
                
                if (((paddleRight.body.position.y > (h - 68)) && paddleRight.body.velocity.y > 0) || ((paddleRight.body.position.y < 20) && paddleRight.body.velocity.y < 0)) {
                    paddleRight.body.velocity.y = 0;
                }
                console.log("Right Velocity" + paddleRight.body.velocity.y);
                
            }
        
            //HACKY CODE INCOMING
            if (ball.body.position.x < 0 || ball.body.position.x > w || ball.body.position.y < 0 || ball.body.position.y > h) {
                ball.body.position.x = w / 2;
                ball.body.position.y = h / 2;
            }
        }
    }
};