export default class Player {
  constructor(scene) {
    this.scene = scene;
    // this.scene.playerStartX = 100;
    // this.scene.playerStartY = 100;
    this.scene.playerStartX = this.scene.sceneWidth * 4 / 2;
    this.scene.playerStartY = this.scene.sceneHeight * 4 / 2;
    this.createPlayer();
  }

  createPlayer() {
    this.scene.anims.createFromAseprite('player');
    this.scene.player = this.scene.physics
      .add.sprite(this.scene.playerStartX, this.scene.playerStartY, "player")
      .setScale(4)
      .setSize(7, 11);
  }
}
