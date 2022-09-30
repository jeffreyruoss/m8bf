export default class PlayerMovement {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.player.direction = 'down';
    this.player.velecity = 300;
  }

  playerMove() {
    this.player.setVelocity(0);

    if (this.scene.keys.A.isDown && this.scene.keys.W.isDown) {
      this.player.setVelocityX(-this.player.velecity);
      this.player.setVelocityY(-this.player.velecity);
      this.player.direction = 'left';
      this.player.anims.play('Walk left', true);
    } else if (this.scene.keys.A.isDown && this.scene.keys.S.isDown) {
      this.player.setVelocityX(-this.player.velecity);
      this.player.setVelocityY(this.player.velecity);
      this.player.anims.play('Walk left', true);
      this.player.direction = 'left';
    } else if (this.scene.keys.D.isDown && this.scene.keys.W.isDown) {
      this.player.setVelocityX(this.player.velecity);
      this.player.setVelocityY(-this.player.velecity);
      this.player.anims.play('Walk right', true);
      this.player.direction = 'right';
    } else if (this.scene.keys.D.isDown && this.scene.keys.S.isDown) {
      this.player.setVelocityX(this.player.velecity);
      this.player.setVelocityY(this.player.velecity);
      this.player.anims.play('Walk right', true);
      this.player.direction = 'right';
    } else if (this.scene.keys.A.isDown) {
      this.player.setVelocityX(-this.player.velecity);
      this.player.play('Walk left', true);
      this.player.direction = 'left';
    } else if (this.scene.keys.D.isDown) {
      this.player.setVelocityX(this.player.velecity);
      this.player.play('Walk right', true);
      this.player.direction = 'right';
    } else if (this.scene.keys.W.isDown) {
      this.player.setVelocityY(-this.player.velecity);
      this.player.play('Walk up', true);
      this.player.direction = 'up';
    } else if (this.scene.keys.S.isDown) {
      this.player.setVelocityY(this.player.velecity);
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
