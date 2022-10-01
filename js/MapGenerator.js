export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
  }

  generateGrass() {
    this.scene.add.tileSprite(0, 0, this.scene.sceneWidth * 4, this.scene.sceneHeight * 4, 'grass').setOrigin(0);
  }

  generateTrees() {
    const treeWidth = this.scene.textures.get('tree').getSourceImage().width;
    const treeHeight = this.scene.textures.get('tree').getSourceImage().height;

    this.scene.trees = this.scene.physics.add.staticGroup();

    for (let i = 0; i < this.scene.sceneWidth * 4; i += treeWidth) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += treeHeight) {
        if (Math.random() > 0.93) {
          const tree = this.scene.physics.add.staticSprite(i, j, 'tree')
            .setOrigin(0, 0)
            .setOffset(treeWidth / 2, treeHeight / 2);
          tree.chops = 0;
          this.scene.trees.add(tree);
        }
      }
    }
    this.scene.physics.add.collider(this.scene.player, this.scene.trees);
  }
}
