import Player from './../Player.js';
import PlayerMovement from "./../PlayerMovement.js";
import MapGenerator from "./../MapGenerator.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  init() {
  }

  preload() {
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.image('grass', './../../img/grass.png');
    this.load.image('tree', './../../img/tree.png');
  }

  create() {
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;

    // Grass
    this.add.tileSprite(0, 0, gameWidth * 4, gameHeight * 4, 'grass').setOrigin(0).setScale(4);

    // Player
    new Player(this);

    // Bounds and camera
    this.cameras.main.setBounds(0, 0, gameWidth * 4, gameHeight * 4);
    this.physics.world.setBounds(0, 0, gameWidth * 4, gameHeight * 4);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    // Player movement
    this.playerMovement = new PlayerMovement(this, this.player);

    // Generate map
    this.mapGenerator = new MapGenerator(this);
  }

  update() {
    this.playerMovement.playerMove();
    // console.log(this.game.loop.actualFps);
  }

}
