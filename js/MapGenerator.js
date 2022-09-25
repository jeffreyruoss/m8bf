export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generateMap();
  }

  generateMap() {
    this.generateTrees();
  }

  generateTrees() {
    const treeWidth = this.scene.textures.get('tree').getSourceImage().width;
    const treeHeight = this.scene.textures.get('tree').getSourceImage().height;


    for (let i = 0; i < this.scene.sceneWidth * 4; i += treeWidth) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += treeHeight) {
        if (Math.random() > 0.93) {
          const tree = this.scene.physics.add.staticSprite(i, j, 'tree')
            .setOrigin(0, 0)
            .setOffset(treeWidth / 2, treeHeight / 2);
          this.scene.physics.add.collider(this.scene.player, tree);
        }
      }
    }
  }
}
