export default class BuildPanel {
  constructor(scene) {
    this.scene = scene;
  }

  // This method is called dynamically from Menu.js
  createBuildPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    const itemPadding = 10;
    const itemSpacing = 35;
    const itemsJSON = this.scene.itemsJSON
    for (let item in itemsJSON) {
      if (itemsJSON[item].buildable) {
        const rectangle = this.scene.add.rectangle(x, y, 120, 170, 0x27253B);
        this.scene.menuItems.add(rectangle);

        const name = item.charAt(0).toUpperCase() + item.slice(1);
        const nameStyle = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };
        const title = this.scene.add.text(x, y + itemPadding, name, nameStyle);
        title.x += (rectangle.width - title.width) / 2;
        this.scene.menuItems.add(title);

        const image = this.scene.add.image(x, title.y + title.height + itemPadding, item);
        image.x += (rectangle.width - image.width) / 2;
        this.scene.menuItems.add(image);

        const buttonStyle = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase", padding: 12.5, backgroundColor: "#3F3F74" };
        const button = this.scene.add.text(x, image.y + image.height + itemPadding, "Build", buttonStyle)
        button.x += (rectangle.width - button.width) / 2;
        button.setInteractive();
        button.on("pointerdown", () => {
          if (this.scene.BuildManager.prePlaceStructure === null) {
            this.scene.Menu.toggleMenu(this.scene.Menu.currentPanel)
            this.scene.BuildManager.build('workshop');
          }
        });
        this.scene.menuItems.add(button);

        y += itemSpacing;
      }
    }
  }
}
