import PlayerMovement from "./../PlayerMovement.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  init() {

  }

  preload() {
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.image('testbg', './../../img/test-bg.png');
  }

  create() {
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.add.image(0, 0, 'testbg').setOrigin(0, 0);
    this.anims.createFromAseprite('player');
    this.player = this.physics.add.sprite(100, 100, "player");
    this.cameras.main.setBounds(0, 0, 1024, 960);
    this.physics.world.setBounds(0, 0, 1024, 960);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    // this.player.setFrame(0);

    this.playerMovement = new PlayerMovement(this.player, this.keys);

  }

  update() {
    this.playerMovement.playerMove();
  }

}
