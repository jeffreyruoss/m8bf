export default class Build {
  constructor(scene) {
    this.scene = scene;
    this.prePlaceStructure = null;
    this.pointer = null;
  }

  build(key) {
    this.scene.Menu.enabled = false;
    this.pointer = this.scene.input.activePointer;
    this.prePlace(key);
    this.scene.time.delayedCall(100, () => {
      this.scene.input.on('pointerdown', (pointer) => {
        if (this.prePlaceStructure) {
          const x = this.prePlaceStructure.x;
          const y = this.prePlaceStructure.y;
          if (this.scene.allObjects.getChildren().length > 0) {
            const overlap = this.scene.physics.overlap(this.prePlaceStructure, this.scene.allObjects);
            if (overlap) {
              this.scene.MessageManager.createMessage(this.pointer.worldX, this.pointer.worldY, 'Too close to another thing', { fontFamily: this.scene.font, color: '#37946e', fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 });
            } else {
              this.place(key);
              this.destroyPrePlace();
            }
          }
        }
      });
    });
  }

  prePlace(key) {
    this.prePlaceStructure = this.scene.physics.add.image(this.pointer.worldX, this.pointer.worldY, key)
      .setAlpha(0.7).setTint(0xa1ff4b).setOrigin(0);
    this.scene.InfoBar.createInfoBar(['Press ESC to cancel', 'Hold SHIFT to snap to grid']);

    this.scene.input.keyboard.on('keydown-ESC', () => {
      this.destroyPrePlace();
      this.scene.input.keyboard.off('keydown-ESC');
    });
  }

  destroyPrePlace() {
    if (this.prePlaceStructure) {
      this.prePlaceStructure.destroy();
      this.prePlaceStructure = null;
      this.scene.InfoBar.destroyInfoBar();
    }
  }

  place(key) {
    // Invisible rectangle for collisions and for the player to act on
    const structure = this.scene.physics.add.staticSprite(this.prePlaceStructure.x, this.prePlaceStructure.y, key)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setSize(64, 32)
      .setOffset(32, 64);

    // Images of the top and bottom half of the object (for visual depth)
    const width = this.scene.textures.get(key).getSourceImage().width;
    const height = this.scene.textures.get(key).getSourceImage().height;
    structure.images = [
      this.scene.add.image(this.prePlaceStructure.x, this.prePlaceStructure.y, key)
        .setOrigin(0, 0).setDepth(3).setCrop(0, 0, width, height / 2),
      this.scene.add.image(this.prePlaceStructure.x, this.prePlaceStructure.y, key)
        .setOrigin(0, 0).setDepth(1).setCrop(0, height / 2, width, height / 2)
    ];
    structure.on('destroy', () => structure.images.forEach(image => image.destroy()));

    this.scene.allObjects.add(structure);
    this.scene.sound.play('placeStructure');
    this.scene.physics.add.collider(this.scene.player, structure);
    this.pointer = null;
    this.scene.player.inventory[key] -= 1;
    this.scene.Menu.enabled = true;
  }

  cancel() {
    this.destroyPrePlace();
    this.scene.Menu.enabled = true;
  }
}
