export default class AutomatonMovement {
  constructor(scene) {
    this.scene = scene;
  }

  clickToMove(automaton) {
    this.scene.input.on('pointerdown', (pointer) => {
      const pointerX = pointer.worldX;
      const pointerY = pointer.worldY;

      this.scene.allObjects.children.iterate((object) => {
        const objectBounds = object.getBounds();
        if (pointerX > objectBounds.x && pointerX < objectBounds.x + objectBounds.width && pointerY > objectBounds.y && pointerY < objectBounds.y + objectBounds.height) {
          const x = objectBounds.x + objectBounds.width / 2;
          const y = objectBounds.y + objectBounds.height / 2;
          automaton.automatonIsMoving = true;
          this.setWalkAnimation(automaton, x, y);
          this.scene.physics.moveTo(automaton.sprite, x, y, 300);
          this.scene.physics.moveTo(automaton.boundary, x, y, 300);
        }
      });
    });
  }

  setWalkAnimation(automaton, targetX, targetY) {
    const angle = Phaser.Math.Angle.Between(automaton.sprite.x, automaton.sprite.y, targetX, targetY);
    const degrees = Phaser.Math.RadToDeg(angle);
    const angleDegrees = degrees < 0 ? 360 + degrees : degrees;
    if (angleDegrees >= 0 && angleDegrees < 45) {
      automaton.direction = 'right';
    } else if (angleDegrees >= 45 && angleDegrees < 135) {
      automaton.direction = 'down';
    } else if (angleDegrees >= 135 && angleDegrees < 225) {
      automaton.direction = 'left';
    } else if (angleDegrees >= 225 && angleDegrees < 315) {
      automaton.direction = 'up';
    } else if (angleDegrees >= 315 && angleDegrees <= 360) {
      automaton.direction = 'right';
    } else {
      automaton.direction = 'down';
    }
    automaton.sprite.play({ key: `Walk ${automaton.direction} - automaton`, repeat: -1 });
  }

  setIdleAnimation(automaton) {
    automaton.sprite.play({ key: `Idle ${automaton.direction} - automaton`, repeat: -1 });
  }
}
