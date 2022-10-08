export default class CraftPanel {
  constructor(scene) {
    this.scene = scene;
  }

  // This method is called dynamically from Menu.js
  createCraftPanel(Menu) {
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    let spacing = 5;
    let padding = 11;
    let width = Menu.box.width - Menu.padding * 2;
    let height = 64 + padding * 2;
    const items = this.scene.itemsJSON;
    for (let item in items) {
      const name = items[item].name;
      const description = items[item].description;
      const recipeObj = items[item].recipe;
      let recipeArray = [];
      let recipe = "";
      for (const property in recipeObj) {
        recipeArray.push(`${property}: ${recipeObj[property]}`);
      }
      recipe = recipeArray.join(" / ");
      recipe = recipe.replace(/\b\w/g, l => l.toUpperCase());
      const isEnoughResources = this.scene.Craft.isEnoughResources(items[item]);
      const boxColor = isEnoughResources ? 0x27253b : 0x1d1b2c;

      const rectangle = this.scene.add.rectangle(x, y, width, height, boxColor);
      this.scene.menuItems.add(rectangle);

      const buttonStyle = { fontSize: "20px", fontFamily: this.scene.font, align: "center" };
      const buttonText = this.scene.add.text(x + padding, y + padding, 'Craft', buttonStyle);
      const buttonRectangle = this.scene.add.rectangle(x + padding, y + padding, buttonText.width + padding * 2 , rectangle.height - padding * 2, 0x3F3F74);
      buttonText.depth = 1
      buttonText.x = buttonRectangle.x - buttonText.width / 2 + buttonRectangle.width / 2;
      buttonText.y = buttonRectangle.y - buttonText.height / 2 + buttonRectangle.height / 2;
      this.scene.menuItems.add(buttonText);
      this.scene.menuItems.add(buttonRectangle);
      buttonRectangle.setInteractive();
      if (isEnoughResources) {
        this.scene.Mouse.buttonHover(buttonRectangle);
      }
      buttonRectangle.on("pointerdown", () => {
        if (isEnoughResources) {
            this.scene.Craft.craftItem(item, items[item]);
            Menu.updateMenu();
        } else {
          const messageStyle = { fontSize: "18px", fontFamily: this.scene.font, align: "center", color: "#AE3737", backgroundColor: "#ffffff", padding: 12 };
          this.scene.MessageManager.createMessage(buttonText.x, buttonText.y, "You don't have the appropriate ingredients.", messageStyle);
        }
      });
      if (!isEnoughResources) {
        buttonRectangle.alpha = 0.2;
        buttonText.alpha = 0.2;
      }

      const itemPlaceholder = this.scene.add.rectangle(buttonRectangle.x + buttonRectangle.width + padding, y + padding, 64, 64, 0x9AACB6);
      this.scene.menuItems.add(itemPlaceholder);

      const itemTitle = this.scene.add
        .text(itemPlaceholder.x + itemPlaceholder.width + padding, y + padding , name, {fontSize: "21px", fontFamily: this.scene.font})
      this.scene.menuItems.add(itemTitle);

      const itemIngredients = this.scene.add
        .text(itemTitle.x + 300, y + padding, recipe, {fontSize: "17px", fontFamily: this.scene.font})
      this.scene.menuItems.add(itemIngredients);

      const itemDescription = this.scene.add
        .text(itemTitle.x, y + 53, description, {fontSize: "17px", fontFamily: this.scene.font})
      this.scene.menuItems.add(itemDescription);

      y += height + spacing;
    }
  }
}
