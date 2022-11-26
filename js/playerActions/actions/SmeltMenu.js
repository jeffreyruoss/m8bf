export default class SmeltMenu {
  constructor(scene) {
    this.scene = scene;
    this.smeltMenuOpen = false;
    this.smeltMenuItems = this.scene.add.group();
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
      }
    });
  }

  openSmeltMenu(object) {
    const padding = 15;
    let x = this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    let y = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    const menu = this.scene.add.rectangle(x, y, 500, 500, 0x222034).setDepth(4);
    this.smeltMenuItems.add(menu);

    const menuBox = menu.getBounds();
    x = menuBox.x + padding;
    y = menuBox.y + padding;

    if (object.data.list.ironOre > 0) {
      const inProgressText = this.scene.add.text(x, y, 'Smelting in progress.', {fontSize: "19px", fontFamily: this.scene.font}).setDepth(5);
      this.smeltMenuItems.add(inProgressText);
      y += 70;
    }

    const addWoodButton = this.scene.add.text(x, y, 'Add wood', {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"}).setDepth(5);
    this.smeltMenuItems.add(addWoodButton);
    if (this.scene.player.inventory.wood === 0) {
      addWoodButton.setAlpha(0.5);
      y += 55;
      const noWoodText = this.scene.add.text(x, y, 'You do not have any wood to add.', {fontSize: "19px", fontFamily: this.scene.font}).setDepth(5);
      this.smeltMenuItems.add(noWoodText);
    } else {
      this.scene.Mouse.buttonHover(addWoodButton);
      addWoodButton.setInteractive();
      addWoodButton.on('pointerdown', () => {
        this.scene.player.inventory.wood -= 1;
        object.data.list.wood += 1;
        this.refreshSmeltMenu(object);
      } , this);
    }

    y += 70;

    const addIronOreButton = this.scene.add.text(x, y, 'Add Iron Ore', {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"}).setDepth(5);
    this.smeltMenuItems.add(addIronOreButton);
    if (this.scene.player.inventory.ironOre === 0) {
      addIronOreButton.setAlpha(0.5);
      y += 55;
      const noIronOreText = this.scene.add.text(x, y, 'You do not have any iron ore to add.', {fontSize: "19px", fontFamily: this.scene.font}).setDepth(5);
      this.smeltMenuItems.add(noIronOreText);
    } else {
      this.scene.Mouse.buttonHover(addIronOreButton);
      addIronOreButton.setInteractive();
      addIronOreButton.on('pointerdown', () => {
        this.scene.player.inventory.ironOre -= 1;
        object.data.list.ironOre += 1;
        this.refreshSmeltMenu(object);
      } , this);
    }

    y += 70;

    const takeIronButton = this.scene.add.text(x, y, 'Take Iron', {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"}).setDepth(5);
    this.smeltMenuItems.add(takeIronButton);
    console.log(object.data.list);
    if (object.data.list.iron === 0) {
      takeIronButton.setAlpha(0.5);
      y += 55;
      const noIronText = this.scene.add.text(x, y, 'There is no iron to take.', {fontSize: "19px", fontFamily: this.scene.font}).setDepth(5);
      this.smeltMenuItems.add(noIronText);
    } else {
      this.scene.Mouse.buttonHover(takeIronButton);
      takeIronButton.setInteractive();
      takeIronButton.on('pointerdown', () => {
        this.scene.player.inventory.iron += 1;
        object.data.list.iron -= 1;
        this.refreshSmeltMenu(object);
      } , this);
    }
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
}
