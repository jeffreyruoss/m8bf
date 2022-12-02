export default class SmeltMenu {
  constructor(scene) {
    this.scene = scene;
    this.smeltMenuOpen = false;
    this.smeltMenuItems = this.scene.add.group();
    this.currentFurnace = null;
    this.smeltMenuCloseListener();
  }

  init() {
    if (this.smeltMenuOpen) {
      this.smeltMenuClose();
      return;
    }
    this.scene.furnaces.children.iterate((object) => {
      const playerBounds = this.scene.player.getBounds();
      const objectBounds = object.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
        this.scene.player.enabled = false;
        this.smeltMenuOpen = true;
        this.openSmeltMenu(object);
        this.currentFurnace = object;
      }
    });
  }

  smeltMenuCloseListener() {
    this.scene.input.keyboard.on('keydown', (event) => {
      if (event.key === 'Escape' && this.smeltMenuOpen) this.smeltMenuClose();
    });
  }

  smeltMenuClose() {
    this.smeltMenuOpen = false;
    this.smeltMenuItems.children.each(item => item.destroy());
    this.scene.player.enabled = true;
  }

  refreshSmeltMenu(object) {
    this.smeltMenuClose();
    this.smeltMenuOpen = true;
    this.openSmeltMenu(object);
  }

  openSmeltMenu(object) {
    const furnaceHasWood = object.data.list.wood > 0;
    const furnaceHasIronOre = object.data.list.ironOre > 0;
    const furnaceHasIron = object.data.list.iron > 0;
    const playerHasWood = this.scene.player.inventory.wood > 0;
    const playerHasIronOre = this.scene.player.inventory.ironOre > 0;

    const padding = 15;
    let x = this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    let y = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    const menu = this.scene.add.rectangle(x, y, 500, 500, 0x222034);
    this.smeltMenuItems.add(menu);

    const menuBox = menu.getBounds();
    x = menuBox.x + padding;
    y = menuBox.y + padding;

    const buttonStyle = {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"};

    const closeButton = this.scene.add.text(x + menuBox.width - padding * 2, y, 'Close', buttonStyle);
    closeButton.setOrigin(1, 0);
    this.smeltMenuItems.add(closeButton);
    this.scene.Mouse.buttonHover(closeButton);
    closeButton.setInteractive();
    closeButton.on('pointerdown', () => {
      this.smeltMenuClose();
    }, this);

    const addWoodButton = this.scene.add.text(x, y, 'Add wood', buttonStyle);
    this.smeltMenuItems.add(addWoodButton);
    if (!playerHasWood || furnaceHasIron) {
      addWoodButton.setAlpha(0.5);
    } else {
      this.scene.Mouse.buttonHover(addWoodButton);
      addWoodButton.setInteractive();
      addWoodButton.on('pointerdown', () => {
        this.scene.player.inventory.wood -= 1;
        object.data.list.wood += 1;
        this.refreshSmeltMenu(object);
      }, this);
    }

    y += 70;

    const addIronOreButton = this.scene.add.text(x, y, 'Add Iron Ore', buttonStyle);
    this.smeltMenuItems.add(addIronOreButton);
    if (!playerHasIronOre || furnaceHasIron) {
      addIronOreButton.setAlpha(0.5);
    } else {
      this.scene.Mouse.buttonHover(addIronOreButton);
      addIronOreButton.setInteractive();
      addIronOreButton.on('pointerdown', () => {
        this.scene.player.inventory.ironOre -= 1;
        object.data.list.ironOre += 1;
        this.refreshSmeltMenu(object);
      }, this);
    }

    y += 70;

    const takeIronButton = this.scene.add.text(x, y, 'Take Iron', buttonStyle);
    this.smeltMenuItems.add(takeIronButton);
    if (!furnaceHasIron) {
      takeIronButton.setAlpha(0.5);
    } else {
      this.scene.Mouse.buttonHover(takeIronButton);
      takeIronButton.setInteractive();
      takeIronButton.on('pointerdown', () => {
        this.scene.player.inventory.iron += 1;
        object.data.list.iron -= 1;
        this.refreshSmeltMenu(object);
      }, this);
    }

    y += 70;

    let margin = 0;
    if (furnaceHasWood) {
      const wood = this.scene.add.image(x, y, 'wood').setOrigin(0, 0);
      this.smeltMenuItems.add(wood);
    }
    if (furnaceHasIronOre) {
      margin = furnaceHasWood ? 70 : 0;
      const ironOre = this.scene.add.image(x + margin, y, 'ironOre').setOrigin(0, 0);
      this.smeltMenuItems.add(ironOre);
    }
    if (furnaceHasIron) {
      margin = furnaceHasWood ? 70 : 0;
      margin += furnaceHasIronOre ? 70 : 0
      const iron = this.scene.add.image(x + margin, y, 'iron').setOrigin(0, 0);
      this.smeltMenuItems.add(iron);

      const smeltingComplete = this.scene.add.text(x, y + 65, 'Smelting Complete',
        {fontSize: "21px", fontFamily: this.scene.font});
      this.smeltMenuItems.add(smeltingComplete);
    }

    y += 70;

    if (furnaceHasWood && furnaceHasIronOre) {
      const inProgressText = this.scene.add.text(x, y, 'Smelting in progress',
        {color: "#fbf236", fontSize: "24px", fontFamily: this.scene.font});
      this.smeltMenuItems.add(inProgressText);
      const smeltingTime = this.scene.Smelt.smeltingTime / 1000;
      const smeltTimeText = this.scene.add.text(x, y + 30, `Smelting takes ${smeltingTime} seconds`,
        {color: "#ffffff", fontSize: "20px", fontFamily: this.scene.font});
      this.smeltMenuItems.add(smeltTimeText);
    }

    this.smeltMenuItems.children.iterate((object) => object.setDepth(5));
  }
}
