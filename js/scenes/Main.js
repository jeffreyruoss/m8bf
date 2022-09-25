import Player from './../Player.js';
import PlayerMovement from "./../PlayerMovement.js";
import PlayerActions from "./../PlayerActions.js";
import MapGenerator from "./../MapGenerator.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  preload() {
    this.time.advancedTiming = true;
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.image('grass', './../../img/grass.png');
    this.load.image('tree', './../../img/tree.png');
  }

  create() {
    this.sceneWidth = this.sys.game.config.width;
    this.sceneHeight = this.sys.game.config.height;

    // Grass
    this.add.tileSprite(0, 0, this.sceneWidth * 4, this.sceneHeight * 4, 'grass').setOrigin(0);

    // Player
    new Player(this);

    // Bounds and camera
    this.cameras.main.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.physics.world.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    // Player movement
    this.playerMovement = new PlayerMovement(this, this.player);

    // Generate map
    this.mapGenerator = new MapGenerator(this);

    // Player actions
    this.playerActions = new PlayerActions(this);
  }

  update() {
    this.playerMovement.playerMove();
    this.playerActions.collectTree();
  }
}
