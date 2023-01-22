import Boundary from "./Boundary.js";

export default class Automaton extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'automaton');
    this.automatonIsMoving = false;
    this.setDepth(2);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.name = "automaton";
    this.body.setSize(35, 28);
    this.body.setOffset(16, 28);
    this.setOrigin(0, 0);
    this.play({ key: "Idle down - automaton", repeat: -1 });
    scene.allObjects.add(this);
    scene.physics.add.collider(this, scene.allObjects);
    this.body.immovable = true;
    this.boundary = new Boundary(this.scene, x, y, 35, 69, 33, 22);
    this.on('destroy', () => { this.boundary.destroy() });

    scene.automatons.add(this);

    scene.physics.add.collider(this, scene.allObjects, () => {
      this.body.stop();
      this.boundary.body.stop();
      scene.AutomatonMovement.setIdleAnimation(this);
    });

    this.scene.AutomatonMovement.clickToMove(this);
  assignTask(automaton) {
    this.scene.player.enabled = false;
    this.scene.allObjects.children.iterate((child) => {
      if (this.scene.cameras.main.worldView.contains(child.x, child.y)) {
        const objectJSON = this.scene.mapObjectsJSON[child.name];
        if (objectJSON === undefined) return;
        if (objectJSON.actionableByAutomaton === undefined) return;
        child.setAlpha(1);
        child.setInteractive();
        child.on('pointerover', () => {
          if (child.images) {
            child.images.forEach((image) => {
              image.setTint(0x00ff00);
            });
          } else {
            child.setTint(0x00ff00);
          }
        });
        child.on('pointerout', () => {
          if (child.images) {
            child.images.forEach((image) => {
              image.clearTint();
            });
          } else {
            child.clearTint();
          }
        });
        child.on('pointerdown', () => {
          automaton.setData('assignedTaskTarget', child);
          this.scene.player.enabled = true;
        });
      }
    });
  }
}
