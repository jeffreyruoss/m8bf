export default class Automaton {
  constructor(scene) {
    this.scene = scene;
    this.direction = "down";
    this.createAutomaton();
  }

  createAutomaton() {
    this.scene.anims.createFromAseprite('automaton');
    this.sprite = this.scene.physics
      .add.sprite(500, 500, "automaton")
      .setDepth(2)
      .setSize(35, 24)
      .setOffset(17, 31);
    this.name = "automaton";
    this.sprite.play({ key: "Idle down - automaton", repeat: -1 });
    this.scene.allObjects.add(this.sprite);

    this.scene.physics.add.collider(this.sprite, this.scene.allObjects, () => {
      this.sprite.body.stop();
      this.sprite.automatonIsMoving = false;
    });

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
