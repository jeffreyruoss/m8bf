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

  createCraftBox() {
    this.createCraftBoxRectangle();
    this.createCraftBoxInventory();
    this.createCraftBoxRecipes();
  }

  createCraftBoxRectangle() {
    this.scene.craftBox.box = this.scene.add
      .rectangle(20, 60, this.scene.sceneWidth - 40, this.scene.sceneHeight - 100, 0x000000)
      .setOrigin(0)
      .setAlpha(0.8)
      .setScrollFactor(0);
  }

  createCraftBoxInventory() {
    const playerInventory = this.scene.player.inventory;
    for (let item in playerInventory) {
      let x = 40;
      let y = 80 + 30 * Object.keys(playerInventory).indexOf(item);
      let style = { font: "17px vcrosdmono", fill: "#ffffff", align: "center", textTransform: "uppercase" };
      let name = item.charAt(0).toUpperCase() + item.slice(1);
      let value = playerInventory[item];
      this.scene.craftBoxItems.add(this.scene.add.text(x, y, `${name}: ${value}`, style).setScrollFactor(0));
    }
  }

  createCraftBoxRecipes() {
    const craftItems = this.scene.craftItems;
    for (let item in craftItems) {
      const name = craftItems[item].name;
      const description = craftItems[item].description;
      const recipe = craftItems[item].recipe;
      let recipeString = "";
      for (let ingredients in recipe) {
        const ingredient = recipe[ingredients];
        for (let val in ingredient) {
          const incredientName = val;
          const incredientValue = ingredient[val];
          recipeString += `${incredientName}: ${incredientValue} `;
        }
      }
      let x = 200;
      let y = 80 + 30 * Object.keys(craftItems).indexOf(item);
      let style = { font: "17px vcrosdmono", fill: "#ffffff", align: "center", textTransform: "uppercase" };
      this.scene.craftBoxItems.add(this.scene.add.text(x, y, `${name}: ${description} = ${recipeString}`, style).setScrollFactor(0));
    }



  }


}
