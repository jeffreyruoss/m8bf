export default class Npc extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'npc');
    this.play({ key: 'Idle down - npc', repeat: -1 });
    this.setDepth(2);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.body.setSize(35, 25);
    this.body.setOffset(17, 28);
    this.scene.allObjects.add(this);
    this.scene.physics.add.collider(this, scene.allObjects);
    this.body.immovable = true;

    this.playerBoundary = scene.physics.add.sprite(x, y, 'playerBoundary');
    this.playerBoundary.setDepth(2);
    this.playerBoundary.setAlpha(0);
    this.playerBoundary.body.setSize(40, 65);
    this.playerBoundary.body.setOffset(0, -10);
    this.playerBoundary.body.immovable = true;
    this.scene.physics.add.collider(this.playerBoundary, this.scene.player);
  }
}
