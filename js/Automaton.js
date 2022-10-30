import Boundary from "./Boundary.js";

export default class Automaton extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'automaton');
    this.automatonIsMoving = false;
    this.setDepth(2);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.body.setSize(35, 25);
    this.body.setOffset(17, 28);
    this.play({ key: "Idle down - automaton", repeat: -1 });
    scene.allObjects.add(this);
    scene.physics.add.collider(this, scene.allObjects);
    this.body.immovable = true;
    this.boundary = new Boundary(this.scene, x, y, 40, 65, 0, -10);
    scene.automatons.add(this);

    scene.physics.add.collider(this, scene.allObjects, () => {
      this.body.stop();
      this.boundary.body.stop();
      scene.AutomatonMovement.setIdleAnimation(this);
    });
  }
}
