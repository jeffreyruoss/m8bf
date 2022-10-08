export default class Menu {
  constructor(scene) {
    this.scene = scene;
    this.open = false;
    this.box = null;
    this.currentPanel = 'craft';
    this.padding = 30;
    this.navHeight = null;
    this.scene.menuItems = this.scene.add.group();
  }

  toggleMenu() {
    if (this.open) {
      this.scene.menuItems.children.each(item => item.destroy());
      this.box.destroy();
      this.open = false;
    } else {
      this.createMenu();
      this.open = true;
    }
  }

  updateMenu() {
    this.scene.Menu.toggleMenu();
    this.scene.Menu.toggleMenu();
  }

  createMenu() {
    this.createMenuRectangle();
    this.createNav();
    const panelName = this.currentPanel.charAt(0).toUpperCase() + this.currentPanel.slice(1);
    this[`create${panelName}Panel`]();
    this.scene.menuItems.children.each(item => item.setScrollFactor(0).setOrigin(0));
  }

  createMenuRectangle() {
    this.scene.Menu.box = this.scene.add
      .rectangle(30, 30, this.scene.sceneWidth - 60, this.scene.sceneHeight - 60, 0x222034);
    this.scene.menuItems.add(this.scene.Menu.box);
  }

  createNav() {
    const menuJSON = this.scene.menuJSON;
    let lastItemX = 0;
    let lastItemWidth = 0;
    for (let item in menuJSON) {
      lastItemX = lastItemX === 0 ? 30 : lastItemX += 2;
      let x = lastItemX + lastItemWidth;
      let y = 30;
      let style = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", padding: 15, textAlign: "center", backgroundColor: "#3f3f74"};
      let currentItem = this.scene.add.text(x, y, menuJSON[item].name, style).setInteractive().on("pointerdown", () => {
          this.currentPanel = item;
          this.updateMenu();
      });
      this.scene.menuItems.add(currentItem);
      lastItemX = currentItem.x;
      lastItemWidth = currentItem.width;
      this.navHeight = this.navHeight || currentItem.height;
    }
  }

  // Dynamically called method name
  createInventoryPanel() {
    const playerInventory = this.scene.player.inventory;
    let x = this.box.x + this.padding;
    let y = this.box.y + this.padding + this.navHeight;
    let itemSpacing = 35;
    for (let item in playerInventory) {
      let style = { fontSize: "19px", fontFamily: this.scene.font, fill: "#ffffff", align: "center", textTransform: "uppercase" };
      let name = item.charAt(0).toUpperCase() + item.slice(1);
      let value = playerInventory[item];
      this.scene.menuItems.add(this.scene.add.text(x, y, `${name}: ${value}`, style));
      y += itemSpacing;
    }
  }

  // Dynamically called method name
  createCraftPanel() {
    const items = this.scene.itemsJSON;
    let x = this.box.x + this.padding;
    let y = this.box.y + this.padding + this.navHeight;
    let spacing = 5;
    let padding = 11;
    let width = this.box.width - this.padding * 2;
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
          this.updateMenu();
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
