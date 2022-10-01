import Player from './../Player.js';
import PlayerMovement from "./../PlayerMovement.js";
import PlayerActions from "./../PlayerActions.js";
import MapGenerator from "./../MapGenerator.js";
import UIBar from "./../UIBar.js";

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

    this.mapGenerator = new MapGenerator(this);

    this.mapGenerator.generateGrass();

    new Player(this);

    this.cameras.main.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.physics.world.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    this.mapGenerator.generateTrees();

    this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE");

    this.playerMovement = new PlayerMovement(this);

    this.playerActions = new PlayerActions(this);

    new UIBar(this);
  }

  update() {
    this.playerMovement.playerMove();
    this.playerActions.collectTree();
  }
}
