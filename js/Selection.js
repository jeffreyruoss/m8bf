export default class Selection {
  constructor(scene) {
    this.scene = scene;
    this.selectionModeEnabled = false;
  }

  getObject(scene, callBack) {
    if (this.selectionModeEnabled) return;
    this.selectionModeEnabled = true;
    const objects = this.getOnScreenObjects(scene);
    objects.forEach((object) => {
      this.enterSelectionMode(scene, object, callBack);
    });
  }

  getOnScreenObjects(scene) {
    const objects = [];
    scene.allObjects.children.iterate((child) => {
      if (scene.cameras.main.worldView.contains(child.x, child.y)) {
        const objectJSON = scene.mapObjectsJSON[child.name];
        if (objectJSON === undefined) return;
        if (objectJSON.actionableByAutomaton === undefined) return;
        objects.push(child);
      }
    });
    return objects;
  }

  enterSelectionMode(scene, object, callBack) {
    object.setAlpha(1);
    object.setInteractive();
    object.on('pointerover', () => this.setTint(object));
    object.on('pointerout', () => this.clearTint(object));
    object.on('pointerdown', () => {
      this.clearTint(object);
      callBack(object);
      const objects = this.getOnScreenObjects(scene);
      objects.forEach((object) => this.exitSelectionMode(object));
      this.selectionModeEnabled = false;
      scene.player.enabled = true;
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
      console.log('no images');
      object.setAlpha(0);
    }
  }
}
