export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.createPlayer();
  }

  createPlayer() {
    this.scene.anims.createFromAseprite('player');
    this.scene.player = this.scene.physics.add.sprite(this.scene.sceneWidth * 4 / 2, this.scene.sceneHeight * 4 /2, "player").setScale(4);
  }

}
