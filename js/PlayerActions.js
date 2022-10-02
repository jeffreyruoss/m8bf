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
          } else {
            this.scene.sound.play('treeChop');
          }
          this.treeCollectTime = this.scene.time.now + this.scene.player.attributes.treeCollectionSpeed;
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
            ironMine.picks = 0;
            ironMine.iron -= 1;
            if (ironMine.iron <= 0) {
              ironMine.destroy();
              this.scene.sound.play('ironMineDeplete');
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
