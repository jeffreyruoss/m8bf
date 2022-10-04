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
          tree.chops += 1;
          if (tree.chops >= 5) {
            tree.destroy();
            this.scene.player.inventory.wood += 1;
            this.scene.sound.play('treeFall');
            this.scene.MessageManager.createMessage(tree.x, tree.y, '+1 Wood', { color: '#37946e', fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 });
          } else {
            this.scene.sound.play('treeChop');
          }
          let collectionSpeed = this.scene.player.attributes.treeCollectionSpeed
          if (this.scene.player.inventory.stoneAxe > 0) {
            collectionSpeed -= this.scene.items.stoneAxe.effects.addTreeCollectionSpeed;
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
          ironMine.picks += 1;
          if (ironMine.picks >= 5) {
            this.scene.player.inventory.iron += 1;
            this.scene.sound.play('ironMineCollect');
            const style = { color: '#37946e', fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 };
            this.scene.MessageManager.createMessage(ironMine.x, ironMine.y, '+1 Iron', style);
            ironMine.picks = 0;
            ironMine.iron -= 1;
            if (ironMine.iron <= 0) {
              ironMine.destroy();
              this.scene.sound.play('ironMineDeplete');
              this.scene.time.delayedCall(300, () => {
                const style = { color: '#ac3232', fontSize: '18px', backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 };
                this.scene.MessageManager.createMessage(ironMine.x, ironMine.y, 'Iron deposit is depleted', style);
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
}
