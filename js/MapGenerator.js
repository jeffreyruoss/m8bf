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

  isObjectAtXY(x, y) {
    const object = this.allObjectsXY.find(object => object.x === x && object.y === y);
    return !!object;
  }

  generateGrass() {
    this.scene.add.tileSprite(0, 0, this.scene.sceneWidth * 4, this.scene.sceneHeight * 4, 'grass').setOrigin(0);
  }

  /**
   * Generate objects of a type on the map (trees, iron-mines, etc.)
   * @param type {string} Type of the object (tree, iron-mine, etc.)
   * @param group {string} Name of the group (trees, ironMines, etc.)
   * @param frequency {number} How often the object should be generated (0-1 range where 1 is 100%)
   */
  generateObjects(type, group, frequency) {
    const width = this.scene.textures.get(type).getSourceImage().width;
    const height = this.scene.textures.get(type).getSourceImage().height;

    this.scene[group] = this.scene.physics.add.staticGroup();

    this.getAllObjectsXY();

    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;

    for (let i = 0; i < this.scene.sceneWidth * 4; i += width) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += height) {
        if (Math.random() < frequency) {
          // Don't spawn the object if there is an object at the same x and y
          if (this.isObjectAtXY(i, j)) continue;

          // Don't spawn the object on the player
          if (i < playerX + 50 && i > playerX - 50) {
            if (j < playerY + 50 && j > playerY - 50) {
              continue;
            }
          }

          // Invisible rectangle for collisions and for the player to act on
          const object = this.scene.physics.add.staticSprite(i, j, type)
            .setOrigin(0, 0)
            .setAlpha(0)
            .setSize(64, 32)
            .setOffset(32, 64);

          // Images of the top and bottom half of the object (for visual depth)
          object.images = [
            this.scene.add.image(i, j, type).setOrigin(0, 0).setDepth(3).setCrop(0, 0, width, height / 2),
            this.scene.add.image(i, j, type).setOrigin(0, 0).setDepth(1).setCrop(0, height / 2, width, height / 2)
          ];

          object.on('destroy', () => object.images.forEach(image => image.destroy()));

          if (type === 'tree') {
            object.chops = 0;
          } else if (type === 'iron-mine') {
            object.picks = 0;
            object.iron = 3;
          }
          this.scene[group].add(object);
          this.scene.allObjects.add(object);
        }
      }
    }
    this.scene.physics.add.collider(this.scene.player, this.scene[group]);
  }
}
