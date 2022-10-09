export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.scene.playerStartX = 100;
    this.scene.playerStartY = 100;
    // this.scene.playerStartX = this.scene.sceneWidth * 4 / 2;
    // this.scene.playerStartY = this.scene.sceneHeight * 4 / 2;
    this.createPlayer();
  }

  createPlayer() {
    this.scene.anims.createFromAseprite('player');
    this.scene.player = this.scene.physics
      .add.sprite(this.scene.playerStartX, this.scene.playerStartY, "player")
      .setDepth(2)
      .setSize(32, 21)
      .setOffset(19, 31);
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
