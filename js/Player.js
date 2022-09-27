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
      .setSize(32, 40);
    this.scene.player.inventory = {
      Wood: 0,
      Stone: 0,
      Iron: 0,
      Gold: 0,
      Water: 0,
      Berries: 0,
      Soybeans: 0,
      Mana: 0,
    }
  }
}
