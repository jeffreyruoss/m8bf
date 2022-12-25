export default class AutomatonMenu {
  constructor(scene) {
    this.scene = scene;
    this.automatonMenuOpen = false;
    this.automatonMenuItems = this.scene.add.group();
    this.currentAutomaton = null;
    this.automatonMenuCloseListener();
  }

  init() {
    if (this.automatonMenuOpen) {
      this.automatonMenuClose();
      return;
    }
    this.scene.automatons.children.iterate((object) => {
      const playerBounds = this.scene.player.getBounds();
      const objectBounds = object.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
        this.scene.player.enabled = false;
        this.automatonMenuOpen = true;
        this.openAutomatonMenu(object);
        this.currentAutomaton = object;
      }
    });
  }

  automatonMenuCloseListener() {
    this.scene.input.keyboard.on('keydown', (event) => {
      if (event.key === 'Escape' && this.automatonMenuOpen) this.automatonMenuClose();
    });
  }

  automatonMenuClose() {
    this.automatonMenuOpen = false;
    this.automatonMenuItems.children.each(item => item.destroy());
    this.scene.player.enabled = true;
  }

  refreshAutomatonMenu(object) {
    this.automatonMenuClose();
    this.automatonMenuOpen = true;
    this.openAutomatonMenu(object);
  }

  openAutomatonMenu(object) {

    const padding = 15;
    let x = this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    let y = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    const menu = this.scene.add.rectangle(x, y, 500, 500, 0x222034);
    this.automatonMenuItems.add(menu);

    const menuBox = menu.getBounds();
    x = menuBox.x + padding;
    y = menuBox.y + padding;

    const buttonStyle = {fontSize: "19px", fontFamily: this.scene.font, padding: 15, backgroundColor: "#3f3f74"};

    const closeButton = this.scene.add.text(x + menuBox.width - padding * 2, y, 'Close', buttonStyle);
    closeButton.setOrigin(1, 0);
    this.automatonMenuItems.add(closeButton);
    this.scene.Mouse.buttonHover(closeButton);
    closeButton.setInteractive();
    closeButton.on('pointerdown', () => {
      this.automatonMenuClose();
    }, this);

    this.automatonMenuItems.children.iterate((object) => object.setDepth(5));
  }
}
