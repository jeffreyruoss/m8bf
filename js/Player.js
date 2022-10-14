export default class Player {
  constructor(scene) {
    this.scene = scene;
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
    }
    this.scene.anims.createFromAseprite('player');
    this.scene.player = this.scene.physics
      .add.sprite(x, y, "player")
      .setDepth(2)
      .setSize(32, 21)
      .setOffset(19, 31);
    this.scene.player.name = "player";

    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.scene.player.attributes = this.scene.savedGameData.player.attributes;
      this.scene.player.inventory = this.scene.savedGameData.player.inventory;
    } else {
    this.scene.player.inventory = {
      wood: 10,
      stone: 10,
      iron: 0,
      gold: 0,
      water: 0,
      berries: 0,
      soybeans: 0,
      mana: 0,
      stoneAxe: 0,
      ironAxe: 0,
      stonePickaxe: 0,
      ironPickaxe: 0,
      workshop: 10,
      hut: 0
    }
    this.scene.player.attributes = {
      movementSpeed: 700, // 300
      treeCollectionSpeed: 300, // 750
      mineCollectionSpeed: 300 // 760
    }
    this.scene.allObjects.add(this.scene.player);
  }
}
