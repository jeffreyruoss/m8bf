export default class PickUp {
  constructor(scene) {
    this.scene = scene;
  }

  pickUp() {
    this.scene.allObjects.children.iterate((object) => {
      if (object && object.name === 'player') return;
      if (object) {
        const playerBounds = this.scene.player.getBounds();
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
          if (this.scene.mapObjectsJSON[object.name] !== undefined) {
            if (this.scene.mapObjectsJSON[object.name].pickUp) {
              this.scene.sound.play('pickUp');
              this.scene.player.inventory[object.name] += 1;
              const message = `+1 ${this.scene.mapObjectsJSON[object.name].name}`;
              this.scene.MessageManager.createMessage(object.x, object.y, message, 'positive');
              object.destroy();
            }
          }
        }
      }
    });
  }
}
