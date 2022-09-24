export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generateMap();
  }

  generateMap() {
    this.generateTrees();
  }

  generateTrees() {
    for (let i = 0; i < this.scene.sceneWidth * 4; i += 64) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += 64) {
        if (Math.random() > 0.93) {
          const tree = this.scene.physics.add.staticSprite(i, j, 'tree').setOrigin(0, 0).setScale(4).setSize(64, 64).setOffset(9, 9);
          this.scene.physics.add.collider(this.scene.player, tree);
        }
      }
    }
  }
}
