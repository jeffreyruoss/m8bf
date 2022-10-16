export default class PlayerActions {
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
          console.log('This object\'s data: ', object.data.list);
          console.log('This object\'s full object: ', object);
          console.log('---------------------');
        }
      });
    });

  }
}
