export default class Npc extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'npc');
    scene.add.existing(this);
    this.play({ key: 'Idle down - npc', repeat: -1 })
  }
}
