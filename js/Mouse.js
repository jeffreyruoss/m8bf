export default class Mouse {
  constructor(scene) {
    this.scene = scene;
  }

  buttonHover(element) {
    element.on('pointerover', () => {
      this.scene.input.setDefaultCursor('pointer');
      if (element.type === 'Text') {
        element.setStyle({ backgroundColor: "#5f5f94" });
      } else if (element.type === 'Rectangle') {
        element.setFillStyle(0x5f5f94);
      }
    });
    element.on('pointerout', () => {
      this.scene.input.setDefaultCursor('default');
      if (element.type === 'Text') {
        element.setStyle({ backgroundColor: "#3f3f74" });
      } else if (element.type === 'Rectangle') {
        element.setFillStyle(0x3f3f74);
      }
    });
  }
}
