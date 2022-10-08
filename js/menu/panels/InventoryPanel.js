export default class InventoryPanel {
  constructor(scene) {
    this.scene = scene;
  }

  // This method is called dynamically from Menu.js
  createInventoryPanel(Menu) {
    const playerInventory = this.scene.player.inventory;
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    let itemSpacing = 35;
    for (let item in playerInventory) {
      let style = { fontSize: "19px", fontFamily: this.scene.font };
      let name = item.charAt(0).toUpperCase() + item.slice(1);
      let value = playerInventory[item];
      this.scene.menuItems.add(this.scene.add.text(x, y, `${name}: ${value}`, style));
      y += itemSpacing;
    }
  }
}
