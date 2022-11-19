export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.playerEnabled = false;
    this.createPlayer();
  }

  createPlayer() {
    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.x = this.scene.savedGameData.player.x;
      this.y = this.scene.savedGameData.player.y;
    } else {
      this.x = this.scene.sceneWidth / 2;
      this.y = this.scene.sceneHeight / 2;
    }
    this.scene.anims.createFromAseprite('player');
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setDepth(2);
    this.setSize(32, 21);
    this.setOffset(19, 31);
    this.setAlpha(0);
    this.name = "player";

    if (this.scene.data.loadGame && this.scene.savedGameData) {
      this.attributes = this.scene.savedGameData.player.attributes;
      this.inventory = this.scene.savedGameData.player.inventory;
    } else {
      this.inventory = {
        wood: 100,
        stone: 100,
        ironOre: 100,
        iron: 100,
        crystal: 0,
        // gold: 0,
        // water: 0,
        // berries: 0,
        // soybeans: 0,
        // mana: 0,
        stoneAxe: 0,
        ironAxe: 0,
        stonePickaxe: 1,
        ironPickaxe: 0,
        chest: 0,
        workbench: 1,
        workshop: 0,
        furnace: 0,
        natureShrine: 0,
        ironMine: 1,
        crystalMine: 1
      }
      this.attributes = {
        movementSpeed: 300, // 300
        collectionSpeed: {
          tree: 300,
          juvenileTree: 300,
          sapling: 300,
          stoneFormation: 300,
          ironOreDeposit: 300,
          crystalDeposit: 300
        }
      }
      this.scene.allObjects.add(this);
    }
  }
}
