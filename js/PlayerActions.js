export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.collectTime = 0;
    this.treeCollectTime = 0;
    this.stoneCollectTime = 0;
    this.ironMineCollectTime = 0;
  }

  collect() {
    this.scene.allObjects.children.iterate((object) => {
      if (object && object.name === 'player') return;
      if (object && this.scene.time.now > this.collectTime) {
        const playerBounds = this.scene.player.getBounds();
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
          let collectionSpeed = this.scene.player.attributes.collectionSpeed[object.name];

          // Tree
          if (object.name === 'tree') {
            object.data.set('chops', object.data.get('chops') + 1);
            if (object.data.get('chops') >= 5) {
              object.destroy();
              this.scene.player.inventory.wood += 1;
              this.scene.sound.play('treeFall');
              this.scene.MessageManager.createMessage(object.x, object.y, '+1 Wood', 'positive');
            } else {
              this.scene.sound.play('treeChop');
            }
            if (this.scene.player.inventory.stoneAxe > 0) {
              collectionSpeed -= this.scene.itemsJSON.stoneAxe.effects.addTreeCollectionSpeed;
            }
          }

          // Stone
          if (object.name === 'stone') {
            object.data.set('picks', object.data.get('picks') + 1);
            if (object.data.get('picks') >= 5) {
              this.scene.player.inventory.stone += 1;
              this.scene.sound.play('ironMineCollect');
              this.scene.MessageManager.createMessage(object.x, object.y, '+1 Stone', 'positive');
              object.data.set('picks', 0);
              object.data.set('stone', object.data.get('stone') - 1);
              if (object.data.get('stone') <= 0) {
                object.destroy();
                this.scene.sound.play('ironMineDeplete');
                this.scene.time.delayedCall(300, () => {
                  this.scene.MessageManager.createMessage(object.x, object.y, 'Stone deposit is depleted', 'negative');
                });
              }
            } else {
              this.scene.sound.play('ironMinePick');
            }
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
