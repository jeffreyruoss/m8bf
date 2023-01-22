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
    this.scene.player.enabled = false;
    const assignableObjects = this.getAssignableObjects();
    assignableObjects.forEach((object) => {
      this.enterSelectionMode(object);
    });
  }

  getAssignableObjects() {
    const objects = [];
    this.scene.allObjects.children.iterate((child) => {
      if (this.scene.cameras.main.worldView.contains(child.x, child.y)) {
        const objectJSON = this.scene.mapObjectsJSON[child.name];
        if (objectJSON === undefined) return;
        if (objectJSON.actionableByAutomaton === undefined) return;
        objects.push(child);
      }
    });
    return objects;
  }

  enterSelectionMode(object) {
    object.setAlpha(1);
    object.setInteractive();
    object.on('pointerover', () => {
      this.setTint(object);
    });
    object.on('pointerout', () => {
      this.clearTint(object);
    });
    object.on('pointerdown', () => {
      this.clearTint(object);
      this.setData('assignedTaskTarget', object);
      const assignableObjects = this.getAssignableObjects();
      assignableObjects.forEach((object) => {
        this.exitSelectionMode(object);
      });

      this.scene.player.enabled = true;
    });
  }

  setTint(object) {
    if (object.images) {
      object.images.forEach((image) => {
        image.setTint(0x00ff00);
      });
    } else {
      object.setTint(0x00ff00);
    }
  }

  clearTint(object) {
    if (object.images) {
      object.images.forEach((image) => {
        image.clearTint();
      });
    } else {
      object.clearTint();
    }
  }

  exitSelectionMode(object) {
    object.disableInteractive();
    object.off('pointerover');
    object.off('pointerout');
    object.off('pointerdown');
    if (!object.images) {
      object.setAlpha(0);
    }
  }
}
