export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
  }

  generateGrass() {
    this.scene.add.tileSprite(0, 0, this.scene.sceneWidth, this.scene.sceneHeight, 'grass').setOrigin(0);
  }

  /**
   * Generate objects of a type on the map (trees, iron-mines, etc.)
   * @param type {string} Type of the object (tree, iron-mine, etc.)
   * @param group {string} Name of the group (trees, ironMines, etc.)
   */
  generateObjects(type, group) {
    const width = this.scene.textures.get(type).getSourceImage().width;
    const height = this.scene.textures.get(type).getSourceImage().height;

    this.scene[group] = this.scene.physics.add.staticGroup();

    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;

    // Generate objects from the saved game data
    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.scene.savedGameData.structures.forEach(structure => {
        if (structure.name === type) {
          this.generateObject(type, group, structure.x, structure.y, width, height, structure.objData);
        }
      });
    } else {
      // Generate objects randomly
      let frequency;
      if (type === 'tree') {
        frequency = 0.07;
      } else if (type === 'iron-mine') {
        frequency = 0.005;
      } else if (type === 'stone') {
        frequency = 0.005;
      } else if (type === 'iron-ore-deposit') {
        frequency = 0.005;
      }
      for (let i = 0; i < this.scene.sceneWidth; i += width) {
        for (let j = 0; j < this.scene.sceneHeight; j += height) {
          if (Math.random() < frequency) {
            // Don't spawn the object near the player
            if (i < playerX + 50 && i > playerX - 50) {
              if (j < playerY + 50 && j > playerY - 50) {
                continue;
              }
            }

            // Randomize the object's x and y coordinates by plus or minus width/height
            const x = i + Math.floor(Math.random() * width) - width / 2;
            const y = j + Math.floor(Math.random() * height) - height / 2;

            let objData = {}

            if (type === 'tree') {
              objData.chops = 0;
            } else if (type === 'iron-mine') {
              objData.picks = 0;
              objData.iron = 3;
            } else if (type === 'stone') {
              objData.picks = 0;
              objData.stone = 20;
            } else if (type === 'iron-ore-deposit') {
              objData.picks = 0;
              objData.iron = 20;
            }

            this.generateObject(type, group, x, y, width, height, objData);
          }
        }
      }
    }

    this.scene.physics.add.collider(this.scene.player, this.scene[group]);
  }

  generateObject(type, group, x, y, width, height, objData) {
    // Invisible rectangle for collisions and for the player to act on
    const object = this.scene.physics.add.staticSprite(x, y, type)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setSize(64, 32)
      .setOffset(32, 64);
    object.name = type;
    object.objData = objData;

    // Don't spawn where there is already an object
    const overlap = this.scene.physics.overlap(object, this.scene.allObjects);
    if (overlap) {
      object.destroy();
      return;
    }

    // Images of the top and bottom half of the object (for visual depth)
    object.images = [
      this.scene.add.image(x, y, type).setOrigin(0, 0).setDepth(3).setCrop(0, 0, width, height / 2),
      this.scene.add.image(x, y, type).setOrigin(0, 0).setDepth(1).setCrop(0, height / 2, width, height / 2)
    ];
    object.on('destroy', () => object.images.forEach(image => image.destroy()));

    this.scene[group].add(object);
    this.scene.allObjects.add(object);
  }
}
