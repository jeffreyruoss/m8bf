export default class InfoBoxManager {
  constructor(scene) {
    this.scene = scene;
    this.margin = 15;
    this.tweenDuration = 500;
    this.infoBoxes = this.scene.add.group();
  }

  reApplyXPositions() {
    this.infoBoxes.getChildren().forEach((infoBox, index) => {
      const width = infoBox.displayWidth;
      const x = index * width + (index + 1) * this.margin;
      this.scene.tweens.add({
        targets: infoBox,
        x: x,
        duration: this.tweenDuration,
        ease: "Power2",
      });
    });
  }
}
