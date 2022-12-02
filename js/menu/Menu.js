// These classes are being called dynamically
import InfoPanel from './panels/InfoPanel.js';
import InventoryPanel from './panels/InventoryPanel.js';
import TechPanel from "./panels/TechPanel.js";
import DialogLogPanel from "./panels/DialogLogPanel.js";
import SavePanel from "./panels/SavePanel.js";
import LoadPanel from "./panels/LoadPanel.js";

export default class Menu {
  constructor(scene) {
    this.scene = scene;
    this.enabled = true;
    this.open = false;
    this.box = null;
    this.currentPanelName = 'inventory';
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
    this.currentPanel.createPanel(this);
    this.scene.menuItems.children.each(item => {
      item.setDepth(item.type === 'Text' ? 5 : 4);
      item.setScrollFactor(0).setOrigin(0);
    });
  }

  createMenuRectangle() {
    const width = 964;
    const height = 890;
    const x = this.scene.cameras.main.width / 2 - width / 2;
    const y = this.scene.cameras.main.height / 2 - height / 2;
    this.scene.Menu.box = this.scene.add
      .rectangle(x, y, width, height, 0x222034);
    this.scene.menuItems.add(this.scene.Menu.box).setOrigin(1, 0);
  }

  nav() {
    const menuJSON = this.scene.menuJSON;
    const style = {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"}
    let x = this.box.x;
    let y = this.box.y;
    let mainNavItems = [];
    let systemNavItems = [];
    for (let item in menuJSON) {
      const currentItem = this.navItem(item, menuJSON[item], style, x, y);
      menuJSON[item].type !== 'system' ? mainNavItems.push(currentItem) : systemNavItems.push(currentItem);
    }
    this.navHeight = mainNavItems[0].height;
    mainNavItems.forEach(item => {
      item.setPosition(x, y);
      x += item.width;
      x += 2;
    });
    systemNavItems.reverse();
    x = this.box.x + this.box.width
    systemNavItems.forEach(item => {
      x -= item.width;
      item.setPosition(x, y);
      x -= 2;
    });
  }

  navItem(item, itemObj, style, x, y) {
    const currentItem = this.scene.add.text(x, y, itemObj.name, style).setInteractive();
    this.scene.Mouse.buttonHover(currentItem);
    currentItem.on("pointerdown", () => {
      this.currentPanelName = item;
      this.updateMenu();
    });
    this.scene.menuItems.add(currentItem);
    return currentItem;
  }
}
