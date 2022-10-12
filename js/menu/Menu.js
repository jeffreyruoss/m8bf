// These classes are being called dynamically
import InventoryPanel from './panels/InventoryPanel.js';
import CraftPanel from './panels/CraftPanel.js';
import BuildPanel from './panels/BuildPanel.js';
import TechPanel from "./panels/TechPanel.js";

export default class Menu {
  constructor(scene) {
    this.scene = scene;
    this.enabled = true;
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
    this.nav();
    const panelName = this.currentPanelName.charAt(0).toUpperCase() + this.currentPanelName.slice(1);
    this.currentPanel = new (eval(panelName + 'Panel'))(this.scene);
    this.currentPanel[`create${panelName}Panel`](this);
    this.scene.menuItems.children.each(item => {
      item.setDepth(item.type === 'Text' ? 5 : 4);
      item.setScrollFactor(0).setOrigin(0);
    });
  }

  createMenuRectangle() {
    this.scene.Menu.box = this.scene.add
      .rectangle(30, 30, this.scene.cameras.main.width - 60, this.scene.cameras.main.height - 60, 0x222034);
    this.scene.menuItems.add(this.scene.Menu.box);
  }

  nav() {
    const menuJSON = this.scene.menuJSON;
    const style = {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"}
    let x = 0;
    let y = this.padding;
    x += this.box.x;
    let systemNavItems = [];
    for (let item in menuJSON) {
      const currentItem = this.navItem(item, menuJSON[item], style, x, y);
      if (menuJSON[item].type !== 'system') {
        x += currentItem.width;
        x += 2;
        this.navHeight = this.navHeight || currentItem.height;
      } else if (menuJSON[item].type === 'system') {
        systemNavItems.push(currentItem);
      }
    }
    systemNavItems.reverse();
    x = this.box.x + this.box.width
    systemNavItems.forEach((item, index) => {
      x -= item.width;
      item.setPosition(x, y);
      x -= 2;
    });
  }

  navItem(item, menuJSONitem, style, x, y) {
    const currentItem = this.scene.add.text(x, y, menuJSONitem.name, style).setInteractive();
    this.scene.Mouse.buttonHover(currentItem);
    currentItem.on("pointerdown", () => {
      this.currentPanelName = item;
      this.updateMenu();
    });
    this.scene.menuItems.add(currentItem);
    return currentItem;
  }
}
