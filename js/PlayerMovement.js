export default class PlayerMovement {
  constructor(player, keys) {
    this.player = player;
    this.keys = keys;
    this.player.direction = 'down';
  }

  playerMove() {
    this.player.setVelocity(0);

    if (this.keys.A.isDown && this.keys.W.isDown) {
      this.player.setVelocityX(-1000);
      this.player.setVelocityY(-1000);
      this.player.direction = 'left';
      this.player.anims.play('Walk left', true);
    } else if (this.keys.A.isDown && this.keys.S.isDown) {
      this.player.setVelocityX(-1000);
      this.player.setVelocityY(1000);
      this.player.anims.play('Walk left', true);
      this.player.direction = 'left';
    } else if (this.keys.D.isDown && this.keys.W.isDown) {
      this.player.setVelocityX(1000);
      this.player.setVelocityY(-1000);
      this.player.anims.play('Walk right', true);
      this.player.direction = 'right';
    } else if (this.keys.D.isDown && this.keys.S.isDown) {
      this.player.setVelocityX(1000);
      this.player.setVelocityY(1000);
      this.player.anims.play('Walk right', true);
      this.player.direction = 'right';
    } else if (this.keys.A.isDown) {
      this.player.setVelocityX(-1000);
      this.player.play('Walk left', true);
      this.player.direction = 'left';
    } else if (this.keys.D.isDown) {
      this.player.setVelocityX(1000);
      this.player.play('Walk right', true);
      this.player.direction = 'right';
    } else if (this.keys.W.isDown) {
      this.player.setVelocityY(-1000);
      this.player.play('Walk up', true);
      this.player.direction = 'up';
    } else if (this.keys.S.isDown) {
      this.player.setVelocityY(1000);
      this.player.play('Walk down', true);
      this.player.direction = 'down';
    } else {
      if (this.player.direction === 'left') {
        this.player.play('Idle left', true);
      } else if (this.player.direction === 'right') {
        this.player.play('Idle right', true);
      } else if (this.player.direction === 'up') {
        this.player.play('Idle up', true);
      } else if (this.player.direction === 'down') {
        this.player.play('Idle down', true);
      }
    }
  }
}
