export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.treeCollectTime = 0;
    this.stoneCollectTime = 0;
    this.ironMineCollectTime = 0;
  }

  collectTree() {
    this.scene.trees.children.iterate((tree) => {
      if (tree && this.scene.time.now > this.treeCollectTime) {
        const playerBounds = this.scene.player.getBounds();
        const treeBounds = tree.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, treeBounds)) {
          tree.data.set('chops', tree.data.get('chops') + 1);
          if (tree.data.get('chops') >= 5) {
            tree.destroy();
            this.scene.player.inventory.wood += 1;
            this.scene.sound.play('treeFall');
            const style = { fontFamily: this.scene.font, color: '#37946e', fontSize: '20px', backgroundColor: 'rgba(203,219,252,0.8)', padding: 5 };
            this.scene.MessageManager.createMessage(tree.x, tree.y, '+1 Wood', 'positive');
          } else {
            this.scene.sound.play('treeChop');
          }
          let collectionSpeed = this.scene.player.attributes.treeCollectionSpeed
          if (this.scene.player.inventory.stoneAxe > 0) {
            collectionSpeed -= this.scene.itemsJSON.stoneAxe.effects.addTreeCollectionSpeed;
          }
          this.treeCollectTime = this.scene.time.now + collectionSpeed;
        }
      }
    });
  }

  collectStone() {
    this.scene.stones.children.iterate((stone) => {
      if (stone && this.scene.time.now > this.stoneCollectTime) {
        const playerBounds = this.scene.player.getBounds();
        const stoneBounds = stone.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, stoneBounds)) {
          stone.data.set('picks', stone.data.get('picks') + 1);
          if (stone.data.get('picks') >= 5) {
            this.scene.player.inventory.stone += 1;
            this.scene.sound.play('ironMineCollect');
            const style = { color: '#37946e', fontFamily: this.scene.font, fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 };
            this.scene.MessageManager.createMessage(stone.x, stone.y, '+1 Stone', 'positive');
            stone.data.set('picks', 0);
            stone.data.set('stone', stone.data.get('stone') - 1);
            if (stone.data.get('stone') <= 0) {
              stone.destroy();
              this.scene.sound.play('ironMineDeplete');
              this.scene.time.delayedCall(300, () => {
                this.scene.MessageManager.createMessage(stone.x, stone.y, 'Stone deposit is depleted', 'negative');
              });
            }
          } else {
            this.scene.sound.play('ironMinePick');
          }
          this.stoneCollectTime = this.scene.time.now + this.scene.player.attributes.mineCollectionSpeed;
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
