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
    let up = false;
    let down = false;
    let left = false;
    let right = false;
    if (source.x > targetX) {
      left = true;
      right = false;
    } else if (source.x < targetX) {
      left = false;
      right = true;
    }
    if (source.y > targetY) {
      up = true;
      down = false;
    } else if (source.y < targetY) {
      down = true;
      up = false;
    }
    if (up && left) {
      source.play({ key: 'Walk left - automaton', repeat: -1 });
    }
    if (up && right) {
      source.play({ key: 'Walk right - automaton', repeat: -1 });
    }
    if (down && left) {
      source.play({ key: 'Walk left - automaton', repeat: -1 });
    }
    if (down && right) {
      source.play({ key: 'Walk right - automaton', repeat: -1 });
    }
    if (up && !left && !right) {
      source.play({ key: 'Walk up - automaton', repeat: -1 });
    }
    if (down && !left && !right) {
      source.play({ key: 'Walk down - automaton', repeat: -1 });
    }

  }

  setIdleAnimation(source, up, down, left, right) {

  }
}
