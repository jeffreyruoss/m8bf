export default class Build {
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
    } else if (this.key === 'ironMine' && obstruction.name === 'ironOreDeposit') {
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

  build(key) {
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
    // Invisible rectangle for collisions and for the player to act on
    const structure = this.scene.physics.add.staticSprite(this.prePlaceStructure.x, this.prePlaceStructure.y, this.key)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setSize(64, 32)
      .setOffset(32, 64);

    // Images of the top and bottom half of the object (for visual depth)
    const width = this.scene.textures.get(this.key).getSourceImage().width;
    const height = this.scene.textures.get(this.key).getSourceImage().height;
    structure.images = [
      this.scene.add.image(this.prePlaceStructure.x, this.prePlaceStructure.y, this.key)
        .setOrigin(0, 0).setDepth(3).setCrop(0, 0, width, height / 2),
      this.scene.add.image(this.prePlaceStructure.x, this.prePlaceStructure.y, this.key)
        .setOrigin(0, 0).setDepth(1).setCrop(0, height / 2, width, height / 2)
    ];
    structure.on('destroy', () => structure.images.forEach(image => image.destroy()));

    this.scene.allObjects.add(structure);
    this.scene.sound.play('placeStructure');
    this.scene.physics.add.collider(this.scene.player, structure);
    this.scene.player.inventory[this.key] -= 1;
    this.key = null;
    this.pointer = null;
    this.scene.Menu.enabled = true;
  }

  update() {
    if (this.scene.Build.prePlaceStructure) {
      if (this.scene.input.keyboard.checkDown(this.scene.keys.SHIFT)) {
        this.scene.Build.prePlaceStructure.x = Math.floor(this.scene.pointer.worldX / 64) * 64;
        this.scene.Build.prePlaceStructure.y = Math.floor(this.scene.pointer.worldY / 64) * 64;
      } else {
        this.scene.Build.prePlaceStructure.x = this.scene.pointer.worldX - this.scene.Build.prePlaceStructure.width / 2;
        this.scene.Build.prePlaceStructure.y = this.scene.pointer.worldY - this.scene.Build.prePlaceStructure.height / 2;
      }
    }
  }
}
