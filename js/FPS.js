export default class FPS {
  constructor(scene, position = 'top-left') {
    this.scene = scene;
    this.element = this.create(position);
  }

  /**
   * Create FPS Counter
   * @param position - 'top-left', 'bottom-left', 'top-right', 'bottom-right'
   * @returns {*}
   */
  create(position) {
    const fpsTextStyle = {
      fontFamily: this.scene.font,
      fontSize: 19,
      color: '#9AE061',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 7
    };

    this.fpsText = this.scene.add.text(0, 0, 'FPS: 00.00', fpsTextStyle)
      .setDepth(1000)
      .setScrollFactor(0);

    const space = 10;
    const fpsWidth = this.fpsText.width;
    const fpsHeight = this.fpsText.height;
    const sceneWidth = this.scene.cameras.main.width;
    const sceneHeight = this.scene.cameras.main.height;
    let x = position === 'top-left' || position === 'bottom-left' ? space : sceneWidth - fpsWidth - space;
    let y = position === 'top-left' || position === 'top-right' ? space : sceneHeight - fpsHeight - space;

    this.fpsText.setPosition(x, y);

    return this.fpsText;
  }

  update() {
    const FPS = this.scene.game.loop.actualFps;
    this.fpsText.setText(`FPS: ${Math.round(FPS * 100) / 100}`);
  }
}
