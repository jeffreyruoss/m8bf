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
        game.add.image(i, j, 'grass').setOrigin(0).setScale(4);
        if (Math.random() > 0.93) {
          game.add.image(i, j, 'tree').setOrigin(0).setScale(4);
        }
      }
    }
  }
}
