export default class Message {
  constructor(scene, text, x, y, style) {
    this.scene = scene;
    this.text = text;
    this.x = x;
    this.y = y;
    this.style = style;
    this.message = this.scene.add.text(this.x, this.y, this.text, this.style).setDepth(6);
  }
}
