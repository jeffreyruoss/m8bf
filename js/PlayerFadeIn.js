export default class PlayerFadeIn {
  constructor(scene) {
    this.scene = scene;
  }

  fadeIn() {
    this.scene.overlay = this.scene.add.rectangle(0, 0, this.scene.sys.game.config.width * this.scene.sceneSizeMultiplier, this.scene.sys.game.config.height * this.scene.sceneSizeMultiplier, 0xffffff)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setBlendMode('ADD')
      .setDepth(1000);
    this.scene.time.delayedCall(4000, () => {
      this.scene.sound.play('portal', { volume: 0.5 });
      const particles = this.scene.add.particles('ironOreDeposit');
      this.scene.cameras.main.flash(100, 255, 255, 255);
      this.scene.cameras.main.shake(200, 0.001);
      this.scene.tweens.add({
        targets: this.scene.overlay,
        alpha: 0.3,
        duration: 500,
        ease: 'Power1',
      });
      const emitter = particles.createEmitter({
        x: this.scene.sceneWidth / 2,
        y: this.scene.sceneHeight / 2,
        quantity: 3,
        blendMode: 'ADD',
        alpha: { start: 1, end: 1 },
        timeScale: 0.3,
        speed: { min: 50, max: 200 },
        angle: { min: 0, max: 360 },
        scale: { min: 0.0625, max: 0.0625 },
        lifespan: { min: 200, max: 400 },
      });
      this.scene.tweens.add({
        targets: this.scene.player,
        alpha: 1,
        duration: 1500,
        ease: 'Linear',
        onComplete: () => {
          emitter.stop();
          this.scene.player.enabled = true;
          this.scene.time.delayedCall(1500, () => {
            this.scene.tweens.add({
              targets: this.scene.overlay,
              alpha: 0,
              duration: 2000,
              ease: 'Power1',
              onComplete: () => {
                this.scene.overlay.destroy();
              }
            });
            particles.destroy();
            emitter.remove();
            this.scene.PlayerFadeIn = null;
          });
        }
      });
    });
  }
}
