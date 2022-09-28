export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
  }

  collectTree() {
    const spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if (this.scene.input.keyboard.checkDown(spacebar, 500)) {
      this.scene.trees.children.iterate((tree) => {
        if (tree) {
          const playerBounds = this.scene.player.getBounds();
          const treeBounds = tree.getBounds();
          if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, treeBounds)) {
            console.log('cutting tree');
            tree.chops += 1;
            console.log('tree.chops', tree.chops);
            if (tree.chops >= 5) {
              tree.destroy();
              this.scene.player.inventory.wood += 1;
              console.log('player.inventory.wood', this.scene.player.inventory.wood);
              this.scene.sound.play('treeFall');
            const woodUIitem = this.scene.uiItems['wood'];
            woodUIitem.setText(`Wood: ${this.scene.player.inventory.wood}`);
            } else {
              this.scene.sound.play('treeChop');
            }
          }
        }
      });
    }
  }
}
