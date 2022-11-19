export default class Inventory2Panel {
  constructor(scene) {
    this.scene = scene;
    this.Menu = '';
    this.infoColWidth = 300;
    this.infoColItems = this.scene.add.group();
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
    const gridAreaWidth = this.Menu.box.width - this.infoColWidth - (this.Menu.padding * 2);
    const gridItemMargin = 1.5;
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
    const infoBoxX = this.Menu.box.x + this.Menu.box.width - this.infoColWidth;
    const infoBoxY = this.Menu.box.y + this.Menu.padding + this.Menu.navHeight;
    const itemName = this.scene.add.text(infoBoxX + 10, infoBoxY + 10, item, { fontSize: "19px", fontFamily: this.scene.font }).setDepth(4);
    itemName.setOrigin(0);
    itemName.setScrollFactor(0);
    this.infoColItems.add(itemName);
    this.scene.menuItems.add(itemName);
  }
}
