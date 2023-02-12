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

    // this.scene.AutomatonMovement.clickToMove(this);
  }

  assignTask() {
    this.scene.InfoBar.createInfoBar(['Select an object to assign the Automaton to.']);
    this.scene.Selection.getObject((object) => {
      this.setData('assignedTaskTarget', object);
      this.scene.InfoBar.destroyInfoBar();
      const message = `Automaton assigned to ${object.name}`;
      this.scene.MessageManager.createMessage(this.scene.pointer.worldX, this.scene.pointer.worldY, message, 'info');
    });
  }
}
