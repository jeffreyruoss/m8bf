import Npc from './Npc.js';
import Automaton from './Automaton.js';

export default class MapGenerator {
  constructor(scene) {
    this.scene = scene;
  }

  generateGrass() {
    const viewportWidth = this.scene.cameras.main.width * this.scene.sceneSizeMultiplier;
    const viewportHeight = this.scene.cameras.main.height * this.scene.sceneSizeMultiplier;
    this.scene.grass = this.scene.add.tileSprite(0, 0, viewportWidth, viewportHeight, 'grass').setOrigin(0);
  }

  scrollGrass() {
    const cameraX = this.scene.cameras.main.scrollX;
    const cameraY = this.scene.cameras.main.scrollY;
    this.scene.grass.x = cameraX * -0.0001;
    this.scene.grass.y = cameraY * -0.0001;
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

    // Load game: Generate objects from the saved game data
    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.scene.savedGameData.structures.forEach(structure => {
        if (structure.name === type) {
          this.generateObject(type, group, structure.x, structure.y, width, height, structure.data);
        }
      });
    } else {
      // New game: Generate objects randomly
      const objJSON = this.scene.mapObjectsJSON[type];

      for (let i = 0; i < this.scene.sceneWidth; i += width) {
        for (let j = 0; j < this.scene.sceneHeight; j += height) {
          if (Math.random() < objJSON.frequency) {
            // Don't spawn the object near the player
            if (i < playerX + 50 && i > playerX - 50) {
              if (j < playerY + 50 && j > playerY - 50) {
                continue;
              }
            }

            // Randomize the object's x and y coordinates by plus or minus width/height
            const x = i + Math.floor(Math.random() * width) - width / 2;
            const y = j + Math.floor(Math.random() * height) - height / 2;

            this.generateObject(type, group, x, y, width, height, objJSON);
          }
        }
      }
    }
  }

  generateObject(type, group, x, y, width, height, objectJSON) {
    // Invisible rectangle for collisions and for the player to act on
    const object = this.scene.physics.add.staticSprite(x, y, type)
      .setOrigin(0, 0)
      .setAlpha(1)
      .setSize(64, 32)
      .setOffset(32, 64);
    object.name = type;
    object.setDataEnabled();
    let data = objectJSON.data ? objectJSON.data : objectJSON;
    Object.entries(data).forEach(([key, value]) => {
      object.data.set(key, value);
    });

    // Don't spawn where there is already an object except for a mine
    if (type !== 'ironMine') {
      const overlap = this.scene.physics.overlap(object, this.scene.allObjects);
      if (overlap) {
        object.destroy();
        return;
      }
    }

    if (!this.scene.mapObjectsJSON[type].flat) {
      // Images of the top and bottom half of the object (for visual depth)
      object.setAlpha(0);
      object.images = [
        this.scene.add.image(x, y, type).setOrigin(0, 0).setDepth(3).setCrop(0, 0, width, height / 2),
        this.scene.add.image(x, y, type).setOrigin(0, 0).setDepth(1).setCrop(0, height / 2, width, height / 2)
      ];
      object.on('destroy', () => object.images.forEach(image => image.destroy()));
    }

    if (!this.scene.mapObjectsJSON[type].traversable) {
      this.scene.physics.add.collider(this.scene.player, object);
    }

    if (!this.scene[group]) {
      this.scene[group] = this.scene.physics.add.staticGroup();
    }
    this.scene[group].add(object);
    this.scene.allObjects.add(object);
  }

  generateNPCs() {
    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.scene.savedGameData.npcs.forEach(npc => {
        new Npc(this.scene, npc.x, npc.y, npc.data);
      });
      this.scene.savedGameData.automatons.forEach(automaton => {
        new Automaton(this.scene, automaton.x, automaton.y, automaton.data);
      });
    } else {
      new Npc(this.scene, this.scene.sceneWidth / 2 -100, this.scene.sceneHeight / 2 -100, 'markusTheGray', 'Markus the Gray');
      new Automaton(this.scene, this.scene.sceneWidth / 2 + 100, this.scene.sceneHeight / 2 + 100);
    }
  }
}
