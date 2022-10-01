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

  /**
   * Generate objects of a type on the map (trees, iron-mines, etc.)
   * @param type {string} Type of the object (tree, iron-mine, etc.)
   * @param group {string} Name of the group to add the object to
   * @param frequency {number} How often the object should be generated (0-1 range where 1 is 100%)
   */
  generateObjects(type, group, frequency) {
    const width = this.scene.textures.get(type).getSourceImage().width;
    const height = this.scene.textures.get(type).getSourceImage().height;

    this.scene[group] = this.scene.physics.add.staticGroup();

    const allObjectsXY = this.getAllObjectsXY();

    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;

    let obj;

    for (let i = 0; i < this.scene.sceneWidth * 4; i += width) {
      for (let j = 0; j < this.scene.sceneHeight * 4; j += height) {
        if (Math.random() < frequency) {
          // Don't spawn the object if there is an object at the same x and y
          obj = allObjectsXY.find(object => object.x === i && object.y === j);
          if (obj) {
            continue;
          }

          // Don't spawn the object on the player
          if (i < playerX + 50 && i > playerX - 50) {
            if (j < playerY + 50 && j > playerY - 50) {
              continue;
            }
          }
          const object = this.scene.physics.add.staticSprite(i, j, type)
            .setOrigin(0, 0)
            .setOffset(width / 2, height / 2);
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
