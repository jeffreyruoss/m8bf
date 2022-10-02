export default class CraftBox {
  constructor(scene) {
    this.scene = scene;
    this.open = false;
    this.box = null;
    this.scene.craftBoxItems = this.scene.add.group();
  }

  toggleCraftBox() {
    if (this.open) {
      this.scene.craftBoxItems.children.each(item => item.destroy());
      this.box.destroy();
      this.open = false;
    } else {
      this.createCraftBox();
      this.open = true;
    }
  }

  updateCraftBox() {
    this.scene.craftBox.toggleCraftBox();
    this.scene.craftBox.toggleCraftBox();
  }

  createCraftBox() {
    this.createCraftBoxRectangle();
    this.createCraftBoxInventory();
    this.createCraftBoxRecipes();
  }

  createCraftBoxRectangle() {
    this.scene.craftBox.box = this.scene.add
      .rectangle(30, 30, this.scene.sceneWidth - 60, this.scene.sceneHeight - 60, 0x000000)
      .setOrigin(0)
      .setAlpha(0.8)
      .setScrollFactor(0);
  }

  createCraftBoxInventory() {
    const playerInventory = this.scene.player.inventory;
    for (let item in playerInventory) {
      let x = 60;
      let y = 60 + 30 * Object.keys(playerInventory).indexOf(item);
      let style = { font: "17px vcrosdmono", fill: "#ffffff", align: "center", textTransform: "uppercase" };
      let name = item.charAt(0).toUpperCase() + item.slice(1);
      let value = playerInventory[item];
      this.scene.craftBoxItems.add(this.scene.add.text(x, y, `${name}: ${value}`, style).setScrollFactor(0));
    }
  }

  createCraftBoxRecipes() {
    const items = this.scene.items;
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
      let x = 250;
      let y = 60 + 100 * Object.keys(items).indexOf(item);
      let style = { font: "17px vcrosdmono", fill: "#ffffff", align: "center"};
      this.scene.craftBoxItems.add(this.scene.add
        .rectangle(x, y, 710, 75, 0x000000)
        .setOrigin(0)
        .setAlpha(0.4)
        .setScrollFactor(0));
      this.scene.craftBoxItems.add(this.scene.add
        .rectangle(x + 15, y + 15, 80, 45, 0x333333)
        .setOrigin(0)
        .setAlpha(0.8)
        .setScrollFactor(0));
      this.scene.craftBoxItems.add(this.scene.add
          .text(x + 30, y + 30, 'CRAFT', style)
          .setScrollFactor(0)
          .setInteractive()
          .on("pointerdown", () => this.scene.craft.craftItem(item, items[item])));
      this.scene.craftBoxItems.add(this.scene.add
        .text(x + 115, y + 15 , name, style)
        .setScrollFactor(0));
      this.scene.craftBoxItems.add(this.scene.add
        .text(x + 315, y + 15, recipe, style)
        .setScrollFactor(0));
      this.scene.craftBoxItems.add(this.scene.add
        .text(x + 115, y + 45, description, style)
        .setScrollFactor(0));
    }
  }
}
