export default class AutomatonMovement {
  constructor(scene) {
    this.scene = scene;
  }

  clickToMove(automaton) {
    this.scene.input.on('pointerdown', (pointer) => {
      const pointerX = pointer.worldX;
      const pointerY = pointer.worldY;

      // TODO this will be dynamic later
      const source = this.scene.automaton1.sprite;

      this.scene.allObjects.children.iterate((object) => {
        const objectBounds = object.getBounds();
        if (pointerX > objectBounds.x && pointerX < objectBounds.x + objectBounds.width && pointerY > objectBounds.y && pointerY < objectBounds.y + objectBounds.height) {
          const x = objectBounds.x + objectBounds.width / 2;
          const y = objectBounds.y + objectBounds.height / 2;
          source.automatonIsMoving = true;
          this.setWalkAnimation(source, x, y);
          this.scene.physics.moveTo(source, x, y, 300);
        }
      });
    });
  }

  setWalkAnimation(source, targetX, targetY) {
    const angle = Phaser.Math.Angle.Between(source.x, source.y, targetX, targetY);
    const degrees = Phaser.Math.RadToDeg(angle);
    const angleDegrees = degrees < 0 ? 360 + degrees : degrees;
    if (angleDegrees >= 0 && angleDegrees < 45) {
      source.play({ key: 'Walk right - automaton', repeat: -1 });
    } else if (angleDegrees >= 45 && angleDegrees < 135) {
      source.play({ key: 'Walk down - automaton', repeat: -1 });
    } else if (angleDegrees >= 135 && angleDegrees < 225) {
      source.play({ key: 'Walk left - automaton', repeat: -1 });
    } else if (angleDegrees >= 225 && angleDegrees < 315) {
      source.play({ key: 'Walk up - automaton', repeat: -1 });
    } else if (angleDegrees >= 315 && angleDegrees <= 360) {
      source.play({ key: 'Walk right - automaton', repeat: -1 });
    } else {
      source.play({ key: 'Walk down - automaton', repeat: -1 });
    }
  }

  setIdleAnimation() {

  }
}
