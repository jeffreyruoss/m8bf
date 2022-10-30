export default class Boundary extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, width, height, offsetX, offsetY) {
    super(scene, x, y, 'boundary');
    this.setDepth(2);
    this.setAlpha(0);
    this.scene.physics.add.existing(this);
    this.body.setSize(width, height);
    this.body.setOffset(offsetX, offsetY);
    this.body.immovable = true;
    scene.add.existing(this);
    this.scene.physics.add.collider(this, this.scene.player);
  }
}
