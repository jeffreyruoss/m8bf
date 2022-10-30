import Boundary from "./Boundary.js";

export default class Automaton {
  constructor(scene, x, y) {
    this.scene = scene;
    this.direction = "down";
    this.createAutomaton(x, y);
  }

  createAutomaton(x, y) {
    this.scene.anims.createFromAseprite('automaton');
    this.sprite = this.scene.physics
      .add.sprite(x, y, "automaton")
      .setDepth(2)
      .setSize(35, 25)
      .setOffset(17, 31);
    this.name = "automaton";
    this.sprite.body.immovable = true;
    this.sprite.play({ key: "Idle down - automaton", repeat: -1 });
    this.scene.allObjects.add(this.sprite);

    this.scene.physics.add.collider(this.sprite, this.scene.allObjects, () => {
      this.sprite.body.stop();
      this.boundary.body.stop();
      this.sprite.automatonIsMoving = false;
      this.scene.AutomatonMovement.setIdleAnimation(this);
    });

    this.boundary = new Boundary(this.scene, x, y, 40, 65, 0, -10);

    this.attributes = {
      movementSpeed: 100, // 300
      collectionSpeed: {
        tree: 300,
        stone: 300,
        ironOreDeposit: 300
      }
    }
  }
}
