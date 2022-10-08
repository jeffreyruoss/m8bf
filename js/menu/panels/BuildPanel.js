export default class BuildPanel {
  constructor(scene) {
    this.scene = scene;
  }

  // This method is called dynamically from Menu.js
  createBuildPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    const padding = 12;
    const margin = 12;
    const width = Menu.box.width - Menu.padding * 2;
    const height = 64 + padding * 2;
    const items = this.scene.itemsJSON
    for (let item in items) {
      if (!items[item].buildable) continue;
      const inInventory = this.inInventory(item);
      const rectangleBackgroundColor = inInventory ? 0x27253b : 0x1d1b2c;

      const rectangle = this.scene.add.rectangle(x, y, width, height, rectangleBackgroundColor);
      this.scene.menuItems.add(rectangle);

      const buttonStyle = { fontSize: "20px", fontFamily: this.scene.font, align: "center" };
      const buttonText = this.scene.add.text(x + padding, y + padding, 'Build', buttonStyle);
      const buttonRectangle = this.scene.add.rectangle(x + padding, y + padding, buttonText.width + padding * 2 , rectangle.height - padding * 2, 0x3F3F74);
      buttonText.depth = 1
      buttonText.x = buttonRectangle.x - buttonText.width / 2 + buttonRectangle.width / 2;
      buttonText.y = buttonRectangle.y - buttonText.height / 2 + buttonRectangle.height / 2;
      this.scene.menuItems.add(buttonText);
      this.scene.menuItems.add(buttonRectangle);
      if (inInventory) buttonRectangle.setInteractive();
      this.scene.Mouse.buttonHover(buttonRectangle);
      buttonRectangle.on("pointerdown", () => {
        if (inInventory) {
          if (this.scene.Build.prePlaceStructure === null) {
            this.scene.Menu.toggleMenu(this.scene.Menu.currentPanel)
            this.scene.Build.build(item);
          }
        } else {
          const messageStyle = { fontSize: "18px", fontFamily: this.scene.font, align: "center", color: "#AE3737", backgroundColor: "#ffffff", padding: 12 };
          this.scene.MessageManager.createMessage(buttonText.x, buttonText.y, "You don't have this item in your inventory", messageStyle);
        }
      });
      if (!inInventory) {
        buttonRectangle.alpha = 0.2;
        buttonText.alpha = 0.2;
      }

      const image = this.scene.add.image(buttonRectangle.x + buttonRectangle.width + padding , y + padding, item);
      this.scene.menuItems.add(image);

      const titleStyle = { fontSize: "22px", fontFamily: this.scene.font, align: "center" };
      const titleText = this.scene.add.text(image.x + image.width + padding, y + padding, items[item].name, titleStyle);
      this.scene.menuItems.add(titleText);

      const descriptionStyle = { fontSize: "18px", fontFamily: this.scene.font, align: "center" };
      const descriptionText = this.scene.add.text(titleText.x, titleText.y + titleText.height + padding + 5, items[item].description, descriptionStyle);
      this.scene.menuItems.add(descriptionText);

      y += height + margin;
    }
  }

  inInventory(key) {
    const playerInventory = this.scene.player.inventory;
    for (let item in playerInventory) {
      if (item === key) return playerInventory[item] > 0;
    }
  }
}
