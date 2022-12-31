export default class SmeltMenuInfo {
  constructor(scene) {
    this.scene = scene;
  }

  static init(scene, object, actionMenu, x, y, buttonStyle) {
    this.scene = scene;
    this.smeltMenuItems = actionMenu.actionMenuItems;
    const furnaceHasWood = object.data.list.wood > 0;
    const furnaceHasIronOre = object.data.list.ironOre > 0;
    const furnaceHasIron = object.data.list.iron > 0;
    const playerHasWood = this.scene.player.inventory.wood > 0;
    const playerHasIronOre = this.scene.player.inventory.ironOre > 0;

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
        actionMenu.refreshActionMenu(object);
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
        actionMenu.refreshActionMenu(object);
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
        this.scene.sound.play('ironMineCollect');
        actionMenu.refreshActionMenu(object);
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
  }
}
