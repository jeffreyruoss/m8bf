export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.playerEnabled = false;
    this.createPlayer();
  }

  createPlayer() {
    let x;
    let y;
    if (this.scene.data.loadGame && this.scene.savedGameData) {
      x = this.scene.savedGameData.player.x;
      y = this.scene.savedGameData.player.y;
    } else {
      x = this.scene.sceneWidth / 2;
      y = this.scene.sceneHeight / 2;
      // x = 100;
      // y = 100;
    }
    this.scene.anims.createFromAseprite('player');
    this.scene.player = this.scene.physics
      .add.sprite(x, y, "player")
      .setDepth(2)
      .setSize(32, 21)
      .setOffset(19, 31)
      .setAlpha(0);
    this.scene.player.name = "player";

    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.scene.player.attributes = this.scene.savedGameData.player.attributes;
      this.scene.player.inventory = this.scene.savedGameData.player.inventory;
    } else {
      this.scene.player.inventory = {
        wood: 10,
        stone: 10,
        ironOre: 0,
        gold: 0,
        water: 0,
        berries: 0,
        soybeans: 0,
        mana: 0,
        stoneAxe: 0,
        ironAxe: 0,
        stonePickaxe: 0,
        ironPickaxe: 0,
        chest: 0,
        workshop: 10,
        hut: 0
      }
      this.scene.player.attributes = {
        movementSpeed: 300, // 300
        collectionSpeed: {
          tree: 300,
          stone: 300,
          ironOreDeposit: 300
        }
      }
      this.scene.allObjects.add(this.scene.player);
    }
  }
}
