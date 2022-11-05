export default class InfoPanel {
  constructor(scene) {
    this.scene = scene;
  }

  createPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;

    let style = { fontSize: "27px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };
    this.scene.menuItems.add(this.scene.add.text(x, y, 'HOW TO PLAY', style));

    style = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };

    this.scene.menuItems.add(this.scene.add.text(x, y + 60, 'MOVEMENT:', style));
    this.scene.menuItems.add(this.scene.add.text(x + 120, y + 60, 'Use the "W", "A", "S", and "D" keys to move.', style));

    this.scene.menuItems.add(this.scene.add.text(x, y + 110, 'ACTION:', style));
    this.scene.menuItems.add(this.scene.add.text(x + 120, y + 110, 'Use the "SPACE" key to interact with a person or object.', style));

    this.scene.menuItems.add(this.scene.add.text(x, y + 160, 'MENU:', style));
    this.scene.menuItems.add(this.scene.add.text(x + 120, y + 160, 'Press "C" to open this menu. Press "ESC" to close the menu.', style));
  }
}
