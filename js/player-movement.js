export default class PlayerMovement {
  constructor(player, keys) {
    this.player = player;
    this.keys = keys;
  }

  playerMove() {
    this.player.setVelocity(0);

    // TODO set facing direction

    if (this.keys.A.isDown && this.keys.W.isDown) {
      this.player.setVelocityX(-100);
      this.player.setVelocityY(-100);
      this.player.anims.play('Walk left', true);
    } else if (this.keys.A.isDown && this.keys.S.isDown) {
      this.player.setVelocityX(-100);
      this.player.setVelocityY(100);
      this.player.anims.play('Walk left', true);
    } else if (this.keys.D.isDown && this.keys.W.isDown) {
      this.player.setVelocityX(100);
      this.player.setVelocityY(-100);
      this.player.anims.play('Walk right', true);
    } else if (this.keys.D.isDown && this.keys.S.isDown) {
      this.player.setVelocityX(100);
      this.player.setVelocityY(100);
      this.player.anims.play('Walk right', true);
    } else if (this.keys.A.isDown) {
      this.player.setVelocityX(-100);
      this.player.play('Walk left', true);
    } else if (this.keys.D.isDown) {
      this.player.setVelocityX(100);
      this.player.play('Walk right', true);
    } else if (this.keys.W.isDown) {
      this.player.setVelocityY(-100);
      this.player.play('Walk up', true);
    } else if (this.keys.S.isDown) {
      this.player.setVelocityY(100);
      this.player.play('Walk down', true);
    }
  }
}
