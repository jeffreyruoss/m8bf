export default class Selection {
  constructor(scene) {
    this.scene = scene;
    this.selectionModeEnabled = false;
    this.callBack = null;
    this.onScreenObjects = [];
    this.escapeListener = null;
  }

  getObject(callBack) {
    if (this.selectionModeEnabled) return;
    this.callBack = callBack;
    this.enterSelectionMode();
  }

  getOnScreenObjects() {
    this.scene.allObjects.children.iterate((child) => {
      if (this.scene.cameras.main.worldView.contains(child.x, child.y)) {
        const objectJSON = this.scene.mapObjectsJSON[child.name];
        if (objectJSON === undefined) return;
        if (objectJSON.actionableByAutomaton === undefined) return;
        this.onScreenObjects.push(child);
      }
    });
  }

  enterSelectionMode() {
    this.scene.player.enabled = false;
    this.selectionModeEnabled = true;
    this.getOnScreenObjects();
    this.scene.input.keyboard.on('keydown', (event) => {
      if (event.key === 'Escape') {
        if (this.callBack !== null) this.callBack('cancel');
        this.exitSelectionMode();
      }
    });
    this.onScreenObjects.forEach((object) => {
      object.setAlpha(1);
      object.setInteractive();
      object.on('pointerover', () => this.setTint(object));
      object.on('pointerout', () => this.clearTint(object));
      object.on('pointerdown', () => {
        this.clearTint(object);
        this.callBack(object);
        this.exitSelectionMode();
      });
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

  exitSelectionMode() {
    this.onScreenObjects.forEach((object) => {
      object.disableInteractive();
      object.off('pointerover');
      object.off('pointerout');
      object.off('pointerdown');
      if (!object.images) {
        object.setAlpha(0);
      }
    });
    this.selectionModeEnabled = false;
    this.scene.player.enabled = true;
    this.onScreenObjects = [];
    this.callBack = null;
    this.scene.input.keyboard.off('keydown');
  }
}
