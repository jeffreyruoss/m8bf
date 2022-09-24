export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generateMap();
  }

  generateMap() {
    const gameWidth = this.scene.sys.game.config.width;
    const gameHeight = this.scene.sys.game.config.height;

    this.generateTrees(gameWidth, gameHeight);
  }

  generateTrees(gameWidth, gameHeight) {
    for (let i = 0; i < gameWidth * 4; i += 64) {
      for (let j = 0; j < gameHeight * 4; j += 64) {
        if (Math.random() > 0.93) {
          const tree = this.scene.physics.add.staticSprite(i, j, 'tree').setOrigin(0, 0).setScale(4).setSize(64, 64).setOffset(9, 9);
          this.scene.physics.add.collider(this.scene.player, tree);
        }
      }
    }
  }
}
