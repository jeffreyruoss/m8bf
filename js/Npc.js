import Boundary from "./Boundary.js";

export default class Npc extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'npc');
    this.play({ key: 'Idle down - npc', repeat: -1 });
    this.setDepth(2);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.name = "npc";
    this.body.setSize(35, 25);
    this.body.setOffset(17, 28);
    scene.allObjects.add(this);
    scene.physics.add.collider(this, scene.allObjects);
    this.body.immovable = true;
    new Boundary(this.scene, x, y, 40, 65, 0, -10);
    scene.npcs.add(this);
  }
}
