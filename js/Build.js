export default class Build {
  constructor(scene) {
    this.scene = scene;
    this.prePlaceStructure = null;
    this.pointer = null;
  }

  build(key) {
    this.pointer = this.scene.input.activePointer;
    this.prePlace(key);
    this.scene.time.delayedCall(100, () => {
      this.scene.input.on('pointerdown', (pointer) => {
        if (this.prePlaceStructure) {
          this.destroyPrePlace();
          this.place(key);
        }
      });
    });
  }

  prePlace(key) {
    this.prePlaceStructure = this.scene.physics.add.image(this.pointer.worldX, this.pointer.worldY, key)
      .setSize(32, 40).setAlpha(0.7).setTint(0xa1ff4b);
    this.scene.input.keyboard.on('keydown-ESC', () => {
      this.destroyPrePlace();
      this.scene.input.keyboard.off('keydown-ESC');
    });
  }

  destroyPrePlace() {
    if (this.prePlaceStructure) {
      this.prePlaceStructure.destroy();
      this.prePlaceStructure = null;
    }
  }

  place(key) {
    const structure = this.scene.physics.add.staticSprite(this.pointer.worldX, this.pointer.worldY, key)
      .setSize(64, 64);
    this.scene.sound.play('placeStructure');
    this.scene.physics.add.collider(this.scene.player, structure);
    this.pointer = null;
    this.scene.player.inventory[key] -= 1;
  }

  cancel() {
    this.destroyPrePlace();
  }
}
