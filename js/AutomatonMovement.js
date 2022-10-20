export default class AutomatonMovement {
  constructor(scene) {
    this.scene = scene;
    this.source = null;
    this.target = null;
    this.automatonIsMoving = false;
  }

  setup() {
    this.scene.input.on('pointerdown', (pointer) => {
      const pointerX = pointer.worldX;
      const pointerY = pointer.worldY;

      // TODO this will be dynamic later
      this.source = this.scene.automaton1.sprite;

      this.scene.allObjects.children.iterate((object) => {
        const objectBounds = object.getBounds();
        if (pointerX > objectBounds.x && pointerX < objectBounds.x + objectBounds.width && pointerY > objectBounds.y && pointerY < objectBounds.y + objectBounds.height) {
          this.target = object;
          const x = objectBounds.x + objectBounds.width / 2;
          const y = objectBounds.y + objectBounds.height / 2;
          this.automatonIsMoving = true;
          this.scene.physics.moveTo(this.source, x, y, 300);
        }
      });
    });
  }
}
