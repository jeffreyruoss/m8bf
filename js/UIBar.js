export default class UIbar {
  constructor(scene) {
    this.scene = scene;
    this.createRectangle();
    this.placeUIItems();
  }

  createRectangle() {
    this.scene.add.rectangle(0, 0, this.scene.sceneWidth, 40, 0x000000)
      .setOrigin(0).setAlpha(0.8).setScrollFactor(0);
  }

  placeUIItems() {
    this.scene.uiItems = [];
    for (let item in this.scene.player.inventory) {
      this.createUIItem(item);
    }
  }

  createUIItem(item) {
    let x = this.scene.sceneWidth / Object.keys(this.scene.player.inventory).length * Object.keys(this.scene.player.inventory)
        .indexOf(item) + 15;
    let style = { font: "17px vcrosdmono", fill: "#ffffff", align: "center", textTransform: "uppercase" };
    let name = item.charAt(0).toUpperCase() + item.slice(1);
    let value = this.scene.player.inventory[item];
    this.scene.uiItems[`${item}`] = this.scene.add.text(x, 12, `${name}: ${value}`, style)
      .setScrollFactor(0);
  }
}
