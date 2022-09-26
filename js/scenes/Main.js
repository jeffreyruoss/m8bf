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
    this.load.audio('treeChop', './../../sounds/sfx_sounds_impact6.mp3');
    this.load.audio('treeFall', './../../sounds/sfx_sounds_impact11.mp3');

  }

  create() {
    this.cameras.main.fadeIn(1000);

    this.sceneWidth = this.sys.game.config.width;
    this.sceneHeight = this.sys.game.config.height;

    this.sound.add('treeChop');
    this.sound.add('treeFall');

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

    // get the number of wood in player inventory
    this.woodText = this.add.text(10, 10, `Wood: ${this.player.inventory.wood}`, { fontFamily: 'vcrosdmono', fontSize: '23px', fill: '#000' });
    this.woodText.setScrollFactor(0);
  }

  update() {
    this.playerMovement.playerMove();
    this.playerActions.collectTree();

    // update the number of wood in player inventory
    this.woodText.setText(`Wood: ${this.player.inventory.wood}`);
  }
}
