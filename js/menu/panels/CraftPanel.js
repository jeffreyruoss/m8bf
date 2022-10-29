export default class CraftPanel {
  constructor(scene) {
    this.scene = scene;
  }

  createPanel(Menu) {
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
      buttonText.x = buttonRectangle.x - buttonText.width / 2 + buttonRectangle.width / 2;
      buttonText.y = buttonRectangle.y - buttonText.height / 2 + buttonRectangle.height / 2;
      this.scene.menuItems.add(buttonText);
      this.scene.menuItems.add(buttonRectangle);
      buttonRectangle.setInteractive();
      if (isEnoughResources) {
        this.scene.Mouse.buttonHover(buttonRectangle);
      }
      buttonRectangle.on("pointerdown", () => {
        const pointerX = this.scene.input.activePointer.worldX;
        const pointerY = this.scene.input.activePointer.worldY;
        if (isEnoughResources) {
            this.scene.MessageManager.createMessage(pointerX, pointerY, `A ${items[item].name} has been added to your Inventory.`, 'positive');
            this.scene.Craft.craftItem(item, items[item]);
            Menu.updateMenu();
        } else {
          this.scene.MessageManager.createMessage(pointerX, pointerY, "You don't have the appropriate ingredients", 'negative');
          this.scene.sound.play('error');
        }
      });
      if (!isEnoughResources) {
        buttonRectangle.alpha = 0.2;
        buttonText.alpha = 0.2;
      }

      const itemImage = this.scene.add.image(buttonRectangle.x + buttonRectangle.width + padding, y + padding, item);
      this.scene.menuItems.add(itemImage);

      const itemTitle = this.scene.add
        .text(itemImage.x + itemImage.width + padding, y + padding , name, {fontSize: "21px", fontFamily: this.scene.font})
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
