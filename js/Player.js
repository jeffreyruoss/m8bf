export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.createPlayer();
  }

  createPlayer() {
    this.scene.anims.createFromAseprite('player');
    const gameWidth = this.scene.sys.game.config.width;
    const gameHeight = this.scene.sys.game.config.height;
    this.scene.player = this.scene.physics.add.sprite(gameWidth * 4 / 2, gameHeight * 4 /2, "player").setScale(4);
  }

}
