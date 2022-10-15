export default class LoadPanel {
  constructor(scene) {
    this.scene = scene;
  }

  createPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    let style = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };
    this.scene.menuItems.add(this.scene.add.text(x, y, 'This will be the Load menu', style));
  }
}
