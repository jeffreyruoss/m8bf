import SmeltMenuInfo from "./SmeltMenuInfo.js";
import AutomatonMenuInfo from "./AutomatonMenuInfo.js";

export default class ActionMenu {
  constructor(scene) {
    this.scene = scene;
    this.actionMenuOpen = false;
    this.actionMenuItems = this.scene.add.group();
    this.currentObject = null;
    this.actionMenuCloseListener();
  }

  init() {
    if (this.actionMenuOpen) {
      this.actionMenuClose();
      return;
    }

    this.scene.automatons.children.iterate((object) => {
      const playerBounds = this.scene.player.getBounds();
      const objectBounds = object.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
        this.currentObject = object;
      }
    });

    this.scene.furnaces.children.iterate((object) => {
      const playerBounds = this.scene.player.getBounds();
      const objectBounds = object.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
        this.currentObject = object;
      }
    });

    if (this.currentObject) {
      this.scene.player.enabled = false;
      this.actionMenuOpen = true;
      this.openActionMenu();
    }


  }

  actionMenuCloseListener() {
    this.scene.input.keyboard.on('keydown', (event) => {
      if (event.key === 'Escape' && this.actionMenuOpen) this.actionMenuClose();
    });
  }

  actionMenuClose() {
    this.actionMenuOpen = false;
    this.actionMenuItems.children.each(item => item.destroy());
    this.scene.player.enabled = true;
  }

  refreshActionMenu(object) {
    this.actionMenuClose();
    this.actionMenuOpen = true;
    this.openActionMenu(object);
  }

  openActionMenu() {
    const padding = 15;
    let x = this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    let y = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    const menu = this.scene.add.rectangle(x, y, 500, 500, 0x222034);
    this.actionMenuItems.add(menu);

    const menuBox = menu.getBounds();
    x = menuBox.x + padding;
    y = menuBox.y + padding;

    const buttonStyle = {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"};

    const closeButton = this.scene.add.text(x + menuBox.width - padding * 2, y, 'Close', buttonStyle);
    closeButton.setOrigin(1, 0);
    this.actionMenuItems.add(closeButton);
    this.scene.Mouse.buttonHover(closeButton);
    closeButton.setInteractive();
    closeButton.on('pointerdown', () => {
      this.actionMenuClose();
    }, this);

    if (this.currentObject.name === 'automaton') {
      AutomatonMenuInfo.init(this.scene, this.currentObject, this, x, y, buttonStyle);
    } else if (this.currentObject.name === 'furnace') {
      SmeltMenuInfo.init(this.scene, this.currentObject, this, x, y, buttonStyle);
    }

    this.actionMenuItems.children.iterate((object) => object.setDepth(5));
  }
}
