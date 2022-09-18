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
    this.add.image(0, 0, 'testbg').setOrigin(0, 0).setScale(4);
    this.anims.createFromAseprite('player');
    this.player = this.physics.add.sprite(100, 100, "player").setScale(4);
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;
    this.cameras.main.setBounds(0, 0, gameWidth * 4, gameHeight * 4);
    this.physics.world.setBounds(0, 0, gameWidth * 4, gameHeight * 4);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);
    this.playerMovement = new PlayerMovement(this.player, this.keys);
  }

  update() {
    this.playerMovement.playerMove();
  }

}
