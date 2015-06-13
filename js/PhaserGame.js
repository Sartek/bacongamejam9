window.onload = function () {
    'use strict';
    var game, w, h, paddleLeft, paddleRight, paddles, wallTop, wallBottom, walls,
        goalLeft, goalRight, goals, ball;
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
        
        goals = game.add.group();
        goals.enableBody = true;
        
        goalLeft = game.add.sprite(8, h / 2, 'goal');
        goalLeft.anchor.setTo(0.5);
        
        goalRight = game.add.sprite(w - 8, h / 2, 'goal');
        goalRight.anchor.setTo(0.5);
        
        ball = game.add.sprite(w / 2, h / 2, 'ball');
        ball.anchor.setTo(0.5);
        
    }

    function update() {
    }
};