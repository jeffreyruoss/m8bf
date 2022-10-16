export default class Automaton {
  constructor(scene) {
    this.scene = scene;
    this.createAutomaton();
  }

  createAutomaton() {
    this.scene.anims.createFromAseprite('automaton');
    this.scene.automaton = this.scene.physics
      .add.sprite(200, 200, "automaton")
      .setDepth(2)
      .setSize(32, 21)
      .setOffset(19, 31);
    this.scene.automaton.name = "automaton";
    // this.scene.automaton.play({ key: "Idle down - automaton", repeat: -1 });
    this.scene.allObjects.add(this.scene.automaton);

    this.scene.automaton.attributes = {
      movementSpeed: 100, // 300
      collectionSpeed: {
        tree: 300,
        stone: 300,
        ironOreDeposit: 300
      }
    }
  }
}
