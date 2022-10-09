export default class Message {
  constructor(scene, text, x, y, type) {
    this.scene = scene;
    this.text = text;
    this.x = x;
    this.y = y;
    this.type = type;
    this.style = this.style();
    this.message = this.add();
    this.textColor();
  }

  style() {
    return {
      fontFamily: this.scene.font,
      fontSize: '20px',
      backgroundColor: 'rgba(203,219,252,0.8)',
      padding: 5
    };
  }

  textColor() {
    if (this.type === 'positive') {
      this.message.setColor('#37946e');
    } else if (this.type === 'negative') {
      this.message.setColor('#AE3737');
    } else if (this.type === 'info') {
      this.message.setColor('#2B6180');
    }
  }

  add() {
    return this.scene.add.text(this.x, this.y, this.text, this.style).setDepth(6);
  }
}
