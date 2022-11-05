export default class InfoBar {
  constructor(scene) {
    this.scene = scene;
    this.rectangle = null;
    this.texts = [];
  }

  createInfoBar(items) {
    this.rectangle = this.scene.add.rectangle(0, -50, this.scene.sceneWidth, 50, 0x212133)
      .setAlpha(0.90).setScrollFactor(0).setOrigin(0).setDepth(4);
    let x = 15;
    const y = -50 + 15;
    items.forEach((item, index) => {
      let style = { fontSize: "18px", fontFamily: this.scene.font };
      const currentItem = this.scene.add.text(x, y, item, style).setOrigin(0).setScrollFactor(0).setDepth(4);
      x += currentItem.width + 50;
      this.texts.push(currentItem);
    });
    this.scene.tweens.add({
      targets: this.rectangle,
      y: 0,
      duration: 500,
      ease: "Power2"
    });
    this.scene.tweens.add({
      targets: [...this.texts],
      y: 15,
      duration: 500,
      ease: "Power2"
    });
  }

  destroyInfoBar() {
    this.scene.tweens.add({
      targets: this.rectangle,
      y: -50,
      duration: 500,
      ease: "Power2"
    });
    this.scene.tweens.add({
      targets: [...this.texts],
      y: -50 + 15,
      duration: 500,
      ease: "Power2"
    });
    this.scene.time.delayedCall(500, () => {
      this.rectangle.destroy();
      this.texts.forEach(text => text.destroy());
    });
  }
}
