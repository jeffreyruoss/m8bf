export default class AutomatonMovement {
  constructor(scene) {
    this.scene = scene;
    this.automaton = this.scene.automaton;
    this.automaton.direction = 'down';
  }

  automatonMove() {
    this.automaton.setVelocity(0);

    if (this.scene.keys.A.isDown && this.scene.keys.W.isDown) {
      this.automaton.setVelocityX(-this.automaton.attributes.movementSpeed);
      this.automaton.setVelocityY(-this.automaton.attributes.movementSpeed);
      this.automaton.direction = 'left';
      this.automaton.anims.play('Walk left - automaton', true);
    } else if (this.scene.keys.A.isDown && this.scene.keys.S.isDown) {
      this.automaton.setVelocityX(-this.automaton.attributes.movementSpeed);
      this.automaton.setVelocityY(this.automaton.attributes.movementSpeed);
      this.automaton.anims.play('Walk left - automaton', true);
      this.automaton.direction = 'left';
    } else if (this.scene.keys.D.isDown && this.scene.keys.W.isDown) {
      this.automaton.setVelocityX(this.automaton.attributes.movementSpeed);
      this.automaton.setVelocityY(-this.automaton.attributes.movementSpeed);
      this.automaton.anims.play('Walk right - automaton', true);
      this.automaton.direction = 'right';
    } else if (this.scene.keys.D.isDown && this.scene.keys.S.isDown) {
      this.automaton.setVelocityX(this.automaton.attributes.movementSpeed);
      this.automaton.setVelocityY(this.automaton.attributes.movementSpeed);
      this.automaton.anims.play('Walk right - automaton', true);
      this.automaton.direction = 'right';
    } else if (this.scene.keys.A.isDown) {
      this.automaton.setVelocityX(-this.automaton.attributes.movementSpeed);
      this.automaton.play('Walk left - automaton', true);
      this.automaton.direction = 'left';
    } else if (this.scene.keys.D.isDown) {
      this.automaton.setVelocityX(this.automaton.attributes.movementSpeed);
      this.automaton.play('Walk right - automaton', true);
      this.automaton.direction = 'right';
    } else if (this.scene.keys.W.isDown) {
      this.automaton.setVelocityY(-this.automaton.attributes.movementSpeed);
      this.automaton.play('Walk up - automaton', true);
      this.automaton.direction = 'up';
    } else if (this.scene.keys.S.isDown) {
      this.automaton.setVelocityY(this.automaton.attributes.movementSpeed);
      this.automaton.play('Walk down - automaton', true);
      this.automaton.direction = 'down';
    } else {
      if (this.automaton.direction === 'left') {
        this.automaton.play('Idle left - automaton', true);
      } else if (this.automaton.direction === 'right') {
        this.automaton.play('Idle right - automaton', true);
      } else if (this.automaton.direction === 'up') {
        this.automaton.play('Idle up - automaton', true);
      } else if (this.automaton.direction === 'down') {
        this.automaton.play('Idle down - automaton', true);
      }
    }
  }
}
