export default class InfoPanel {
  constructor(scene) {
    this.scene = scene;
  }

  createPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    let style = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };
    this.scene.menuItems.add(this.scene.add.text(x, y, 'MOVEMENT: Use the "W", "A", "S", and "D" keys to move.', style));
    this.scene.menuItems.add(this.scene.add.text(x, y + 40, 'ACTION: Use the "SPACE" key to interact with a person or object.', style));
    this.scene.menuItems.add(this.scene.add.text(x, y + 80, 'MENU: Press "C" to open this menu. Press "ESC" to close the menu.', style));
  }
}
