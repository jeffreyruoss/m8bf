// These classes are being called dynamically
import InventoryPanel from './panels/InventoryPanel.js';
import CraftPanel from './panels/CraftPanel.js';
import BuildPanel from './panels/BuildPanel.js';
import TechPanel from "./panels/TechPanel.js";

export default class Menu {
  constructor(scene) {
    this.scene = scene;
    this.open = false;
    this.box = null;
    this.currentPanelName = 'build';
    this.currentPanel = null;
    this.padding = 30;
    this.navHeight = null;
    this.scene.menuItems = this.scene.add.group();
  }

  toggleMenu() {
    if (this.open) {
      this.scene.menuItems.children.each(item => item.destroy());
      this.box.destroy();
      this.currentPanel = null;
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
    const panelName = this.currentPanelName.charAt(0).toUpperCase() + this.currentPanelName.slice(1);
    this.currentPanel = new (eval(panelName + 'Panel'))(this.scene);
    this.currentPanel[`create${panelName}Panel`](this);
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
      let currentItem = this.scene.add.text(x, y, menuJSON[item].name, style).setInteractive();
      this.scene.Mouse.buttonHover(currentItem);
      currentItem.on("pointerdown", () => {
        this.currentPanelName = item;
        this.updateMenu();
      });
      this.scene.menuItems.add(currentItem);
      lastItemX = currentItem.x;
      lastItemWidth = currentItem.width;
      this.navHeight = this.navHeight || currentItem.height;
    }
  }
}
