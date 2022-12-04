export default class InfoBox {
  constructor(scene, message) {
    this.scene = scene;
    this.message = message;
    this.createInfoBox();
  }

  createInfoBox() {
    // const orange = '0xdf7126';
    // const yellow = '0xfbf236';
    // const darkBlue = '0x222034';
    const numBoxes = this.scene.InfoBoxManager.infoBoxes.getChildren().length;
    const margin = this.scene.InfoBoxManager.margin;
    const padding = 15;
    const width = 200;
    const x = numBoxes * width + (numBoxes + 1) * margin;
    const text = this.scene.add.text(x, margin, this.message,
      {fontSize: "18px", fontFamily: this.scene.font, color: "#000000", backgroundColor: "#e8e4a4", padding: {x: padding, y: padding}})
      .setDepth(5)
      .setOrigin(0)
      .setScrollFactor(0)
      .setWordWrapWidth(width)
      .setInteractive();
    text.displayWidth = width;
    this.scene.InfoBoxManager.infoBoxes.add(text);
    text.on('pointerdown', () => {
      this.scene.InfoBoxManager.infoBoxes.remove(text);
      this.scene.InfoBoxManager.reApplyXPositions();
      text.destroy();
    }, this);
  }
}
