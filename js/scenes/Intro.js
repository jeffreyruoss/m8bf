export default class Intro extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  init() {

  }

  preload() {
  }

  create() {
    // get the center of the screen dynamically
    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.introText = this.add.text(centerX, centerY - 10, 'This is the Intro screen', { fontFamily: 'rainyhearts', fontSize: '96px', fill: '#fff' }).setOrigin(0.5);
    this.introText.setScale(0.25);



    this.button = this.add.text(centerX, centerY + 10, 'Start Game', { fontFamily: 'rainyhearts', fontSize: '48px', fill: '#0f0' }).setOrigin(0.5);
    this.button.setScale(0.25);
    this.button.setInteractive();
    this.button.on('pointerdown', () => this.scene.start('Main'));
  }

  update() {
  }
}
