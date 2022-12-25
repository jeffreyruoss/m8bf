import Automaton from "./Automaton.js";

export default class Place {
  constructor(scene) {
    this.scene = scene;
    this.prePlaceStructure = null;
    this.key = null;
    this.pointer = null;
  }

  placeHandler() {
    this.scene.input.on('pointerdown', () => {
      if (this.prePlaceStructure) {
        this.placeConditions();
      }
    });
  }

  cancelHandler() {
    this.scene.input.keyboard.on('keydown-ESC', () => {
      if (this.prePlaceStructure) {
        this.destroyPrePlace();
        this.scene.Menu.enabled = true;
      }
    });
  }

  placeConditions() {
    const obstruction = this.checkForObstruction();
    if (this.key === 'ironMine' && obstruction.name !== 'ironOreDeposit') {
      this.scene.MessageManager.createMessage(this.pointer.worldX, this.pointer.worldY, 'Must be placed on iron ore deposit', 'negative');
      this.scene.sound.play('error');
    } else if (this.key === 'crystalMine' && obstruction.name !== 'crystalDeposit') {
      this.scene.MessageManager.createMessage(this.pointer.worldX, this.pointer.worldY, 'Must be placed on crystal deposit', 'negative');
      this.scene.sound.play('error');
    } else if (this.key === 'ironMine' && obstruction.name === 'ironOreDeposit') {
      obstruction.data.set('mine', 1);
      this.place();
      this.destroyPrePlace();
    } else if (this.key === 'crystalMine' && obstruction.name === 'crystalDeposit') {
      obstruction.data.set('crystalMine', 1);
      this.place();
      this.destroyPrePlace();
    } else if (!obstruction) {
      this.place();
      this.destroyPrePlace();
    } else {
      this.scene.MessageManager.createMessage(this.pointer.worldX, this.pointer.worldY, 'Too close to another thing', 'negative');
      this.scene.sound.play('error');
    }
  }

  checkForObstruction() {
    let obstruction = false;
    this.scene.allObjects.children.iterate((object) => {
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.prePlaceStructure.getBounds(), object.getBounds())) {
        obstruction = object;
      }
    });
    return obstruction;
  }

  placeInit(key) {
    this.scene.Menu.enabled = false;
    this.pointer = this.scene.input.activePointer;
    this.key = key;
    this.prePlace();
  }

  prePlace() {
    this.prePlaceStructure = this.scene.physics.add.image(this.pointer.worldX, this.pointer.worldY, this.key)
      .setAlpha(0.7).setTint(0xa1ff4b).setOrigin(0).setDepth(4);
    this.scene.InfoBar.createInfoBar(['Press ESC to cancel', 'Hold SHIFT to snap to grid']);
  }

  destroyPrePlace() {
    if (this.prePlaceStructure) {
      this.prePlaceStructure.destroy();
      this.prePlaceStructure = null;
      this.scene.InfoBar.destroyInfoBar();
    }
  }

  place() {
    const width = this.scene.textures.get(this.key).getSourceImage().width;
    const height = this.scene.textures.get(this.key).getSourceImage().height;
    const objJSON = this.scene.mapObjectsJSON[this.key];
    if (this.key === 'automaton') {
      new Automaton(this.scene, this.prePlaceStructure.x, this.prePlaceStructure.y);
    } else {
      this.scene.MapGenerator.generateObject(this.key, objJSON.groupName, this.prePlaceStructure.x, this.prePlaceStructure.y, width, height, objJSON);
    }

    this.scene.sound.play('placeStructure');
    this.scene.player.inventory[this.key] -= 1;
    this.key = null;
    this.pointer = null;
    this.scene.Menu.enabled = true;
  }

  update() {
    if (this.scene.Place.prePlaceStructure) {
      if (this.scene.input.keyboard.checkDown(this.scene.keys.SHIFT)) {
        this.scene.Place.prePlaceStructure.x = Math.floor(this.scene.pointer.worldX / 64) * 64;
        this.scene.Place.prePlaceStructure.y = Math.floor(this.scene.pointer.worldY / 64) * 64;
      } else {
        this.scene.Place.prePlaceStructure.x = this.scene.pointer.worldX - this.scene.Place.prePlaceStructure.width / 2;
        this.scene.Place.prePlaceStructure.y = this.scene.pointer.worldY - this.scene.Place.prePlaceStructure.height / 2;
      }
    }
  }
}
