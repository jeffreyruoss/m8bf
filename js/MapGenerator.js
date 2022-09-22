export default class MapGenerator {
  constructor() {
  }

  generateMap(game) {
    const gameWidth = game.sys.game.config.width;
    const gameHeight = game.sys.game.config.height;

    this.generateTrees(game, gameWidth, gameHeight);
  }

  generateTrees(game, gameWidth, gameHeight) {
    for (let i = 0; i < gameWidth * 4; i += 64) {
      for (let j = 0; j < gameHeight * 4; j += 64) {
        if (Math.random() > 0.93) {
          const tree = game.physics.add.staticSprite(i, j, 'tree').setOrigin(0, 0).setScale(4).setSize(64, 64).setOffset(9, 9);
          game.physics.add.collider(game.player, tree);
        }
      }
    }
  }
}
