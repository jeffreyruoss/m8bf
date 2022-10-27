export default class SavePanel {
  constructor(scene) {
    this.scene = scene;
  }

  createPanel(Menu) {
    const playerInventory = this.scene.player.inventory;
    let x = Menu.box.x + Menu.padding;
    let y = Menu.box.y + Menu.padding + Menu.navHeight;
    const button = this.scene.add.text(x, y, 'Save Game', { fontSize: "32px", fontFamily: this.scene.font, align: "center", backgroundColor: '#27253b', padding: 12 });
    this.scene.menuItems.add(button);
    button.setInteractive();
    this.scene.Mouse.buttonHover(button);
    button.on("pointerdown", () => {
      this.saveGame();
      this.scene.MessageManager.createMessage(button.x, button.y, "Game Saved", 'positive');
      this.scene.sound.play('craft');
    } );

  }

  saveGame() {
    const date = new Date();
    const dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let saveObject = {
      time: dateString,
      player: {
        x: this.scene.player.x,
        y: this.scene.player.y,
        attributes: this.scene.player.attributes,
        inventory: this.scene.player.inventory,
      },
      structures: [],
      tech: {}
    }

    this.scene.allObjects.children.iterate((child) => {
      if (child.name !== 'player') {
        let data = child.data ? child.data.list : null;
        saveObject.structures.push({
          name: child.name,
          x: child.x,
          y: child.y,
          data: data
        });
      }
    });

    localStorage.setItem('m8bf', JSON.stringify(saveObject));
    console.log('Game Saved', dateString);
  }
}
