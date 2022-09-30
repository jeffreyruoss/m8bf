export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.treeCollectTime = 0;
  }

  collectTree() {
    if (this.scene.input.keyboard.checkDown(this.scene.keys.SPACE)) {
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
              const woodUIitem = this.scene.uiItems['wood'];
              woodUIitem.setText(`Wood: ${this.scene.player.inventory.wood}`);
            } else {
              this.scene.sound.play('treeChop');
            }
            this.treeCollectTime = this.scene.time.now + 500;
          }
        }
      });
    }
  }
}
