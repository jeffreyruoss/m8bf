export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
    this.allObjectsXY = [];
  }

  /**
   * Get all objects' x and y coordinates
   * Used to check if there is an object at the same x and y (faster than iterating through the actual objects)
   * @returns {Array} Array of objects with x and y coordinates
   * @memberof MapGenerator
   */
  getAllObjectsXY() {
    this.scene.allObjects.getChildren().forEach(object => {
      this.allObjectsXY.push({ x: object.x, y: object.y });
    });
    return this.allObjectsXY;

  }

  generateGrass() {
    this.scene.add.tileSprite(0, 0, this.scene.sceneWidth * 4, this.scene.sceneHeight * 4, 'grass').setOrigin(0);
  }

  generateTrees() {
    const treeWidth = this.scene.textures.get('tree').getSourceImage().width;
    const treeHeight = this.scene.textures.get('tree').getSourceImage().height;

    this.scene.trees = this.scene.physics.add.staticGroup();

    const allObjectsXY = this.getAllObjectsXY();

    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;

    for (let i = 0; i < this.scene.sceneWidth * 4; i += treeWidth) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += treeHeight) {
        if (Math.random() < 0.07) {
          // Don't spawn the mine if there is an object at the same x and y
          let object = allObjectsXY.find(object => object.x === i && object.y === j);
          if (object) {
            continue;
          }
          // Don't spawn the tree on the player
          if (i < playerX + 50 && i > playerX - 50) {
            if (j < playerY + 50 && j > playerY - 50) {
              continue;
            }
          }
          const tree = this.scene.physics.add.staticSprite(i, j, 'tree')
            .setOrigin(0, 0)
            .setOffset(treeWidth / 2, treeHeight / 2);
          tree.chops = 0;
          this.scene.trees.add(tree);
          this.scene.allObjects.add(tree);
        }
      }
    }
    this.scene.physics.add.collider(this.scene.player, this.scene.trees);
  }

  generateIronMines() {
    const mineWidth = this.scene.textures.get('iron-mine').getSourceImage().width;
    const mineHeight = this.scene.textures.get('iron-mine').getSourceImage().height;

    this.scene.ironMines = this.scene.physics.add.staticGroup();

    const allObjectsXY = this.getAllObjectsXY();

    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;

    for (let i = 0; i < this.scene.sceneWidth * 4; i += mineWidth) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += mineHeight) {
        if (Math.random() < 0.005) {
          // Don't spawn the mine if there is an object at the same x and y
          let object = allObjectsXY.find(object => object.x === i && object.y === j);
          if (object) {
            continue;
          }
          // Don't spawn the iron mine on the player
          if (i < playerX + 50 && i > playerX - 50) {
            if (j < playerY + 50 && j > playerY - 50) {
              continue;
            }
          }
          const ironMine = this.scene.physics.add.staticSprite(i, j, 'iron-mine')
            .setOrigin(0, 0)
            .setOffset(mineWidth / 2, mineHeight / 2);
          ironMine.picks = 0;
          ironMine.iron = 3;
          this.scene.ironMines.add(ironMine);
          this.scene.allObjects.add(ironMine);
        }
      }
    }
    this.scene.physics.add.collider(this.scene.player, this.scene.ironMines);
  }
}
