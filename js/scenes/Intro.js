export default class Intro extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  init() {
  }

  preload() {
    this.load.audio('start', './../../sounds/sfx_coin_cluster5.mp3');
  }

  create() {
    this.cameras.main.fadeIn(1000);

    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.text(centerX, centerY - 40, 'This is the Intro screen',
      { fontFamily: 'vcrosdmono', fontSize: '50px', fill: '#fff' })
      .setOrigin(0.5);

    this.add.text(centerX, centerY + 40, 'Start new game',
      { fontFamily: 'vcrosdmono', fontSize: '30px', fill: '#0f0' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.add('start').play();
        this.cameras.main.fadeOut(2000);
        this.time.delayedCall(2000, () => {
          this.scene.start('Main');
        });
      });

    this.add.text(centerX, centerY + 120, 'Load from last save',
      { fontFamily: 'vcrosdmono', fontSize: '30px', fill: '#0f0' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.add('start').play();
        this.cameras.main.fadeOut(2000);
        this.time.delayedCall(2000, () => {
          this.scene.start('Main', { loadGame: true });
        });
      });

    // get the last save date and add it to the screen
    const lastSave = localStorage.getItem('m8bf');
    if (lastSave) {
      const lastSaveDate = JSON.parse(lastSave).time;
      this.add.text(centerX, centerY + 160, lastSaveDate,
        { fontFamily: 'vcrosdmono', fontSize: '22px', fill: '#0f0' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.cameras.main.fadeOut(1000);
          this.time.delayedCall(1000, () => {
            this.scene.start('Main', { loadGame: true });
          });
        });
    }
  }

  update() {
  }
}
