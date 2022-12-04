export default class InfoBoxManager {
  constructor(scene) {
    this.scene = scene;
    this.margin = 15;
    this.infoBoxes = this.scene.add.group();
  }

  reApplyXPositions() {
    this.infoBoxes.getChildren().forEach((infoBox, index) => {
      const width = infoBox.displayWidth;
      const x = index * width + (index + 1) * this.margin;
      this.scene.tweens.add({
        targets: infoBox,
        x: x,
        duration: 500,
        ease: "Power2",
      });
    });
  }
}
