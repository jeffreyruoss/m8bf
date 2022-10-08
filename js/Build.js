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
          this.destroyPrePlace();
          this.place(key);
        }
      });
    });
  }

  prePlace(key) {
    this.prePlaceStructure = this.scene.physics.add.image(this.pointer.worldX, this.pointer.worldY, key)
      .setSize(32, 40).setAlpha(0.7).setTint(0xa1ff4b).setOrigin(1);

    this.infoBox();

    this.scene.input.keyboard.on('keydown-ESC', () => {
      this.destroyPrePlace();
      this.scene.input.keyboard.off('keydown-ESC');
    });
  }

  infoBox() {
    const rectangle = this.scene.add.rectangle(0, 0, this.scene.sceneWidth, 64, 0x212133).setOrigin(0).setAlpha(0.99).setScrollFactor(0);
    const text1 = this.scene.add.text(15, 15, "Press ESC to cancel", { font: "18px", fontFamily: this.scene.font}).setScrollFactor(0);
    const text2 = this.scene.add.text(0, 0, "Hold SHIFT to ignore grid", { font: "18px", fontFamily: this.scene.font}).setScrollFactor(0);
    Phaser.Display.Align.In.LeftCenter(text1, rectangle, 15);
    Phaser.Display.Align.In.LeftCenter(text2, rectangle, 15);
    text1.x = 30;
    text2.x = text1.width + 100;
    this.infoBoxItems.push(rectangle, text1, text2);
  }

  destroyPrePlace() {
    if (this.prePlaceStructure) {
      this.prePlaceStructure.destroy();
      this.prePlaceStructure = null;
      this.infoBoxItems.forEach(item => item.destroy());
    }
  }

  place(key) {
    const structure = this.scene.physics.add.staticSprite(Math.round(this.pointer.worldX / 64) * 64, Math.round(this.pointer.worldY / 64) * 64, key)
      .setSize(64, 64).setOrigin(1);
    this.scene.sound.play('placeStructure');
    this.scene.physics.add.collider(this.scene.player, structure);
    this.pointer = null;
    this.scene.player.inventory[key] -= 1;
  }

  cancel() {
    this.destroyPrePlace();
  }
}
