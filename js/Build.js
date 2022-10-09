export default class Build {
  constructor(scene) {
    this.scene = scene;
    this.prePlaceStructure = null;
    this.pointer = null;
    this.infoBoxItems = [];
  }

  build(key) {
    this.pointer = this.scene.input.activePointer;
    this.prePlace(key);
    this.scene.time.delayedCall(100, () => {
      this.scene.input.on('pointerdown', (pointer) => {
        if (this.prePlaceStructure) {
          const x = this.prePlaceStructure.x;
          const y = this.prePlaceStructure.y;
          this.scene.MapGenerator.getAllObjectsXY();
          if (this.scene.MapGenerator.isObjectAtXY(x, y)) {
            this.scene.MessageManager.createMessage(this.pointer.worldX, this.pointer.worldY, 'There is already a structure here.', { fontFamily: this.scene.font, color: '#37946e', fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 });
          } else {
            this.place(key);
            this.destroyPrePlace();
          }
        }
      });
    });
  }

  prePlace(key) {
    this.prePlaceStructure = this.scene.physics.add.image(this.pointer.worldX, this.pointer.worldY, key)
      .setAlpha(0.7).setTint(0xa1ff4b).setOrigin(0);
    console.log(this.prePlaceStructure);
    this.scene.InfoBar.createInfoBar(['Press ESC to cancel', 'Hold SHIFT to ignore grid']);

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
    const structure = this.scene.physics.add.staticSprite(this.prePlaceStructure.x, this.prePlaceStructure.y, key)
      .setOrigin(0).setOffset(32, 32);
    this.scene.allObjects.add(structure);
    this.scene.sound.play('placeStructure');
    this.scene.physics.add.collider(this.scene.player, structure);
    this.pointer = null;
    this.scene.player.inventory[key] -= 1;
  }

  cancel() {
    this.destroyPrePlace();
  }
}
