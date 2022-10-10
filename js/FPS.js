export default class FPS {
  constructor(scene) {
    this.scene = scene;
    this.element = this.create();
  }

  create() {
    const fpsTextStyle = {
      fontFamily: this.scene.font,
      fontSize: 22,
      color: '#9AE061',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 15
    };
    this.fpsText = this.scene.add.text(10, 10, 'FPS: 0', fpsTextStyle)
      .setDepth(1000)
      .setScrollFactor(0);
    return this.fpsText;
  }

  update() {
    this.fpsText.setText('FPS: ' + this.scene.game.loop.actualFps);
  }
}
