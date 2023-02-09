export default class Inspect {
  constructor(scene) {
    this.scene = scene;
  }

  inspect() {
    this.scene.keys.I.on('down', () => {
      const playerBounds = this.scene.player.getBounds();
      const inspectBounds = new Phaser.Geom.Rectangle(playerBounds.x, playerBounds.y, playerBounds.width, playerBounds.height);
      if (this.scene.player.direction === 'up') {
        inspectBounds.y -= 16;
      }
      if (this.scene.player.direction === 'down') {
        inspectBounds.y += 16;
      }
      if (this.scene.player.direction === 'left') {
        inspectBounds.x -= 16;
      }
      if (this.scene.player.direction === 'right') {
        inspectBounds.x += 16;
      }
      this.scene.allObjects.children.iterate((object) => {
        if (object.name === 'player') return;
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(inspectBounds, objectBounds)) {
          console.log('---------------------');
          console.log('this object\'s name:', object.name);
          console.log(object.data ? object.data.list : 'object.data is null');
          console.log('This object\'s full object: ', object);
          console.log('---------------------');
        }
      });
    });
  }
}
