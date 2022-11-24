export default class InventoryPanel {
  constructor(scene) {
    this.scene = scene;
    this.infoColWidth = 300;
    this.infoColItems = this.scene.add.group();
    this.infoColPadding = 10;
  }

  createPanel(Menu) {
    this.Menu = Menu;
    this.itemGrid(this.scene.player.inventory);
    this.infoCol();
  }

  itemGrid(items) {
    let x = this.Menu.box.x + this.Menu.padding;
    let y = this.Menu.box.y + this.Menu.padding + this.Menu.navHeight;
    const imgScale = 1;
    const itemWidth = 64 * imgScale;
    const itemHeight = 64 * imgScale;
    const gridAreaWidth = this.Menu.box.width - this.infoColWidth - this.Menu.padding;
    const gridItemMargin = 4;
    const gridItemBorderWidth = 1;
    const gridItemPadding = 4;
    const itemBoxWidth = itemWidth + (gridItemBorderWidth * 2) + (gridItemPadding * 2);
    const itemBoxHeight = itemHeight + (gridItemBorderWidth * 2) + (gridItemPadding * 2);
    const gridCols = Math.floor(gridAreaWidth / itemBoxWidth);
    let currentCol = 1;
    for (let item in items) {
      const itemBox = this.scene.add.rectangle(x, y, itemBoxWidth, itemBoxHeight, 0x1D1B2C);
      itemBox.setStrokeStyle(gridItemBorderWidth, 0x3F3F74);
      itemBox.setInteractive();
      itemBox.on('pointerdown', () => this.displayInfo(item, this.Menu));
      const itemImg = this.scene.add.image(x + gridItemPadding, y + gridItemPadding, item).setScale(imgScale);
      const amount = this.scene.add.text(x + 5, y, items[item], { fontSize: "19px", fontFamily: this.scene.font });
      this.scene.menuItems.add(itemBox);
      this.scene.menuItems.add(itemImg);
      this.scene.menuItems.add(amount);
      x += itemBoxWidth + gridItemMargin;
      if (currentCol === gridCols) {
        x = this.Menu.box.x + this.Menu.padding;
        y += itemBoxHeight + gridItemMargin;
        currentCol = 1;
      } else {
        currentCol++;
      }
    }
  }

  infoCol() {
    const infoBoxX = this.Menu.box.x + this.Menu.box.width - this.infoColWidth;
    const infoBoxY = this.Menu.box.y + this.Menu.padding + this.Menu.navHeight;
    const infoBoxWidth = this.infoColWidth - this.Menu.padding;
    const infoBoxHeight = this.Menu.box.height - this.Menu.navHeight- (this.Menu.padding * 2);
    const itemInfo = this.scene.add.rectangle(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight, 0x1D1B2C);
    itemInfo.setOrigin(0);
    itemInfo.setScrollFactor(0);
    itemInfo.setStrokeStyle(1, 0x3F3F74);
    this.scene.menuItems.add(itemInfo);
  }

  displayInfo(item) {
    this.infoColItems.children.each(item => item.destroy());
    const x = this.Menu.box.x + this.Menu.box.width - this.infoColWidth + this.infoColPadding;
    let y = this.Menu.box.y + this.Menu.padding + this.Menu.navHeight + this.infoColPadding;
    const itemName = this.scene.add.text(x, y, this.scene.itemsJSON[item].name)
      .setStyle({ fontSize: "27px", color: "#ababff" })
    this.infoColItems.add(itemName);
    this.scene.menuItems.add(itemName);
    y += itemName.height + 15;
    const itemDesc = this.scene.add.text(x, y, this.scene.itemsJSON[item].description)
      .setStyle({ fontSize: "19px" })
      .setWordWrapWidth(this.infoColWidth - (this.infoColPadding * 2) - 30);
    this.infoColItems.add(itemDesc);
    this.scene.menuItems.add(itemDesc);
    this.craftInfo(item);
    this.placeInfo(item);
    this.infoColItems.children.each(item => item
      .setScrollFactor(0).setDepth(4).setOrigin(0).setStyle({ fontFamily: this.scene.font }));
  }

  craftInfo(item) {
    const recipe = this.scene.itemsJSON[item].recipe;
    if (!recipe) return;
    const lastItem = this.infoColItems.getChildren()[this.infoColItems.getChildren().length - 1];
    const x = this.Menu.box.x + this.Menu.box.width - this.infoColWidth + this.infoColPadding;
    let y = lastItem.y + lastItem.height + 30;
    const recipeText = this.scene.add.text(x, y, 'Crafting recipe:')
      .setStyle({ fontSize: "22px", color: "#7b7bb2" });
    this.infoColItems.add(recipeText);
    this.scene.menuItems.add(recipeText);
    for (let item in recipe) {
      y += recipeText.height + 10;
      const itemText = this.scene.add.text(x, y, `${recipe[item]} ${item}`)
        .setStyle({ fontSize: "19px" });
      this.infoColItems.add(itemText);
      this.scene.menuItems.add(itemText);
    }
    y += 30;
    const craftText = this.scene.add.text(x, y, 'Craft')
      .setStyle({ fontSize: "19px", backgroundColor: "#00775b" })
      .setPadding(15, 12, 15, 12);
    this.infoColItems.add(craftText);
    this.scene.menuItems.add(craftText);
    if (this.scene.Craft.isEnoughResources(this.scene.itemsJSON[item])) {
      const pointerX = this.scene.input.activePointer.worldX;
      const pointerY = this.scene.input.activePointer.worldY;
      craftText.setInteractive()
        .on('pointerdown', () => {
          this.scene.MessageManager.createMessage(pointerX, pointerY, `A ${this.scene.itemsJSON[item].name} has been added to your Inventory.`, 'positive');
          this.scene.Craft.craftItem(item, this.scene.itemsJSON[item]);
          this.Menu.updateMenu();
          this.displayInfo(item);
        });
    } else {
      craftText.setAlpha(0.3).setStyle({ backgroundColor: "#646083"});
      y += 50;
      const notEnoughResources = this.scene.add.text(x, y, "You don't have the appropriate items to craft this item.")
        .setStyle({fontSize: "18px"})
        .setWordWrapWidth(this.infoColWidth - (this.infoColPadding * 2) - 30);
      this.infoColItems.add(notEnoughResources);
      this.scene.menuItems.add(notEnoughResources);
    }
  }

  placeInfo(item) {
    if (!this.scene.itemsJSON[item].placeable) return;
    const x = this.Menu.box.x + this.Menu.box.width - this.infoColWidth + this.infoColPadding;
    const lastItem = this.infoColItems.getChildren()[this.infoColItems.getChildren().length - 1];
    let y = lastItem.y + 85;
    const placeButton = this.scene.add.text(x, y, 'Place')
      .setStyle({ fontSize: "19px", backgroundColor: "#00775b" })
      .setPadding(15, 12, 15, 12);
    this.infoColItems.add(placeButton);
    this.scene.menuItems.add(placeButton);

    const inInventory = this.inInventory(item);

    if (inInventory) {
      placeButton.setInteractive();
      placeButton.on('pointerdown', () => {
        if (this.scene.Place.prePlaceStructure === null) {
          this.scene.Menu.toggleMenu(this.scene.Menu.currentPanel)
          this.scene.Place.placeInit(item);
        }
      });
    } else {
      placeButton.setAlpha(0.3).setStyle({ backgroundColor: "#646083"});
      y += 50;
      const dontHave = this.scene.add.text(x, y, "You don't have this item in your Inventory. Craft it first")
        .setStyle({fontSize: "18px"})
        .setWordWrapWidth(this.infoColWidth - (this.infoColPadding * 2) - 30);
      this.infoColItems.add(dontHave);
      this.scene.menuItems.add(dontHave);
    }
  }

  inInventory(key) {
    const playerInventory = this.scene.player.inventory;
    for (let item in playerInventory) {
      if (item === key) return playerInventory[item] > 0;
    }
  }
}
