export default class Collect {
  constructor(scene) {
    this.scene = scene;
    this.collectTime = 0;
  }

  collect() {
    this.scene.allObjects.children.iterate((object) => {
      if (object && object.name === 'player') return;
      if (object && this.scene.time.now > this.collectTime) {
        const playerBounds = this.scene.player.getBounds();
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
          let collectionSpeed = this.scene.player.attributes.collectionSpeed[object.name];

          const objectJSON = this.scene.mapObjectsJSON[object.name];
          if (objectJSON === undefined) return;

          // Requirement rules
          if (objectJSON.requires !== undefined && objectJSON.requires === "mine") {
            if (object.data.get('mine') <= 0) {
              const message = 'Build a mine to extract ore';
              this.scene.MessageManager.createMessage(object.x, object.y, message, 'info');
              this.collectTime = this.scene.time.now + collectionSpeed;
              return;
            }
          }

          let harvestTickSound, collectSound, depletedSound;

          if (objectJSON.harvestType === 'tree') {
            harvestTickSound = 'treeChop';
            depletedSound = 'treeFall';
          } else if (objectJSON.harvestType === 'mine') {
            harvestTickSound = 'ironMinePick';
            collectSound = 'ironMineCollect';
            depletedSound = 'ironMineDeplete';
          } else {
            return;
          }

          object.data.set('harvestTicks', object.data.get('harvestTicks') + 1);
          if (object.data.get('harvestTicks') >= 5) {
            let message;
            object.data.set(objectJSON.resource.key, object.data.get(objectJSON.resource.key) - 1);
            this.scene.player.inventory[objectJSON.resource.key] += 1;
            message = `+1 ${objectJSON.resource.name}`;
            this.scene.MessageManager.createMessage(object.x, object.y, message, 'positive');
            object.data.set('harvestTicks', 0);
            if (object.data.get(objectJSON.resource.key) <= 0) {
              object.destroy();
              this.scene.sound.play(depletedSound);
              if (objectJSON.harvestType === 'mine') {
                this.scene.time.delayedCall(300, () => {
                  message = `${objectJSON.resource.name} is depleted`;
                  this.scene.MessageManager.createMessage(object.x, object.y, message, 'negative');
                });
              }
            } else {
              this.scene.sound.play(collectSound);
            }
          } else {
            this.scene.sound.play(harvestTickSound);
          }

          this.collectTime = this.scene.time.now + collectionSpeed;
        }
      }
    });
  }
}
