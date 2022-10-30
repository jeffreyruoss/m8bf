export default class Automaton {
  constructor(scene) {
    this.scene = scene;
    this.direction = "down";
    this.createAutomaton();
  }

  createAutomaton() {
    this.scene.anims.createFromAseprite('automaton');
    this.sprite = this.scene.physics
      .add.sprite(this.scene.sceneWidth / 2 + 100, this.scene.sceneHeight / 2 + 100, "automaton")
      .setDepth(2)
      .setSize(35, 25)
      .setOffset(17, 31);
    this.name = "automaton";
    this.sprite.body.immovable = true;
    this.sprite.play({ key: "Idle down - automaton", repeat: -1 });
    this.scene.allObjects.add(this.sprite);

    this.scene.physics.add.collider(this.sprite, this.scene.allObjects, () => {
      this.sprite.body.stop();
      this.sprite.automatonIsMoving = false;
      this.scene.AutomatonMovement.setIdleAnimation(this);
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
