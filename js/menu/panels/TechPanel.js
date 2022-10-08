export default class TechPanel {
  constructor(scene) {
    this.scene = scene;
  }

  // This method is called dynamically from Menu.js
  createTechPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    let style = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };
    this.scene.menuItems.add(this.scene.add.text(x, y, 'This will be the Tech menu', style));
  }
}
