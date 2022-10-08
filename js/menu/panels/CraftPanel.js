export default class CraftPanel {
  constructor(scene) {
    this.scene = scene;
  }

  // This method is called dynamically from Menu.js
  createCraftPanel(Menu) {
    const items = this.scene.itemsJSON;
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    let spacing = 5;
    let padding = 11;
    let width = Menu.box.width - Menu.padding * 2;
    let height = 64 + padding * 2;
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
      let boxColor = isEnoughResources ? 0x27253b : 0x1d1b2c;
      this.scene.menuItems.add(this.scene.add.rectangle(x, y, width, height, boxColor));

      const style = { fontSize: "20px", fontFamily: this.scene.font, fill: "#ffffff", backgroundColor: "#3f3f74", padding: 24.5, textAlign: "center" };
      const craftButton = this.scene.add.text(x + padding, y + padding, 'CRAFT', style);
      this.scene.menuItems.add(craftButton);
      if (isEnoughResources) {
        craftButton.setInteractive().on("pointerdown", () => {
          this.scene.Craft.craftItem(item, items[item]);
          Menu.updateMenu();
        });
      } else {
        craftButton.alpha = 0.2;
      }

      const itemPlaceholder = this.scene.add.rectangle(craftButton.x + craftButton.width + padding, y + padding, 64, 64, 0x9AACB6);
      this.scene.menuItems.add(itemPlaceholder);

      const itemTitle = this.scene.add
        .text(itemPlaceholder.x + itemPlaceholder.width + padding, y + padding , name, {fontSize: "21px", fontFamily: this.scene.font, fill: "#ffffff"})
      this.scene.menuItems.add(itemTitle);

      const itemIngredients = this.scene.add
        .text(itemTitle.x + 300, y + padding, recipe, {fontSize: "17px", fontFamily: this.scene.font, fill: "#ffffff"})
      this.scene.menuItems.add(itemIngredients);

      const itemDescription = this.scene.add
        .text(itemTitle.x, y + 53, description, {fontSize: "17px", fontFamily: this.scene.font, fill: "#ffffff"})
      this.scene.menuItems.add(itemDescription);

      y += height + spacing;
    }
  }
}
