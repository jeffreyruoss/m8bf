export default class Intro extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  init() {
  }

  preload() {
  }

  create() {
    this.cameras.main.fadeIn(1000);

    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.text(centerX, centerY - 40, 'This is the Intro screen',
      { fontFamily: 'vcrosdmono', fontSize: '50px', fill: '#fff' })
      .setOrigin(0.5);

    this.button = this.add.text(centerX, centerY + 40, 'Start Game',
      { fontFamily: 'vcrosdmono', fontSize: '30px', fill: '#0f0' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
          this.scene.start('Main');
        });
      });
  }

  update() {
  }
}
