window.onload = function () {
    'use strict';
    var game, w, h, paddleLeft, paddleRight, paddles, wallTop, wallBottom, walls,
        goalLeft, goalRight, goals, ball,
        wKey, sKey, upKey, downKey;
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
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#000000";
        
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        paddles = game.add.group();
        paddles.enableBody = true;
        
        paddleLeft = game.add.sprite(40, h / 2, 'paddle');
        paddleLeft.anchor.setTo(0.5);
        
        paddleRight = game.add.sprite(w - 40, h / 2, 'paddle');
        paddleRight.anchor.setTo(0.5);
        
        paddles.add(paddleLeft);
        paddles.add(paddleRight);
        
        walls = game.add.group();
        walls.enableBody = true;
        
        wallTop = game.add.sprite(w / 2, 8, 'wall');
        wallTop.anchor.setTo(0.5);
        
        wallBottom = game.add.sprite(w / 2, h - 8, 'wall');
        wallBottom.anchor.setTo(0.5);
        
        walls.add(wallTop);
        walls.add(wallBottom);
        walls.setAll('body.immovable', true);
        
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
        
    }

    function update() {
        game.physics.arcade.collide(paddles, walls);
        
        paddles.setAll('body.velocity.y', 0);
        
        if (wKey.isDown && !sKey.isDown) {
            paddleLeft.body.velocity.y = -240;
        }
        
        if (sKey.isDown && !wKey.isDown) {
            paddleLeft.body.velocity.y = 240;
        }
        
        if (upKey.isDown && !downKey.isDown) {
            paddleRight.body.velocity.y = -240;
        }
        
        if (downKey.isDown && !upKey.isDown) {
            paddleRight.body.velocity.y = 240;
        }
    }
};