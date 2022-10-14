export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.treeCollectTime = 0;
    this.ironMineCollectTime = 0;
  }

  collectTree() {
    this.scene.trees.children.iterate((tree) => {
      if (tree && this.scene.time.now > this.treeCollectTime) {
        const playerBounds = this.scene.player.getBounds();
        const treeBounds = tree.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, treeBounds)) {
          tree.objData.chops += 1;
          if (tree.objData.chops >= 5) {
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

  collectIronMine() {
    this.scene.ironMines.children.iterate((ironMine) => {
      if (ironMine && this.scene.time.now > this.ironMineCollectTime) {
        const playerBounds = this.scene.player.getBounds();
        const ironMineBounds = ironMine.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, ironMineBounds)) {
          ironMine.objData.picks += 1;
          if (ironMine.objData.picks >= 5) {
            this.scene.player.inventory.iron += 1;
            this.scene.sound.play('ironMineCollect');
            const style = { color: '#37946e', fontFamily: this.scene.font, fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 };
            this.scene.MessageManager.createMessage(ironMine.x, ironMine.y, '+1 Iron', 'positive');
            ironMine.objData.picks = 0;
            ironMine.objData.iron -= 1;
            if (ironMine.objData.iron <= 0) {
              ironMine.destroy();
              this.scene.sound.play('ironMineDeplete');
              this.scene.time.delayedCall(300, () => {
                this.scene.MessageManager.createMessage(ironMine.x, ironMine.y, 'Iron deposit is depleted', 'negative');
              });
            }
          } else {
            this.scene.sound.play('ironMinePick');
          }
          this.ironMineCollectTime = this.scene.time.now + this.scene.player.attributes.treeCollectionSpeed;
        }
      }
    });
  }

  inspect() {
    this.scene.keys.I.on('down', () => {
      const playerBounds = this.scene.player.getBounds();
      const inspectBounds = new Phaser.Geom.Rectangle(playerBounds.x, playerBounds.y, playerBounds.width, playerBounds.height);
      if (this.scene.player.direction === 'up') {
        inspectBounds.y -= 32;
      }
      if (this.scene.player.direction === 'down') {
        inspectBounds.y += 32;
      }
      if (this.scene.player.direction === 'left') {
        inspectBounds.x -= 32;
      }
      if (this.scene.player.direction === 'right') {
        inspectBounds.x += 32;
      }
      this.scene.trees.children.iterate((tree) => {
        if (tree) {
          const treeBounds = tree.getBounds();
          if (Phaser.Geom.Intersects.RectangleToRectangle(inspectBounds, treeBounds)) {
            console.log('This structure\'s objData', tree.objData);
          }
        }
      } );
      this.scene.ironMines.children.iterate((ironMine) => {
        if (ironMine) {
          const ironMineBounds = ironMine.getBounds();
          if (Phaser.Geom.Intersects.RectangleToRectangle(inspectBounds, ironMineBounds)) {
            console.log('This structure\'s objData', ironMine.objData);
          }
        }
      });
    });

  }
}
