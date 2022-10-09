import Message from "./Message.js";

export default class MessageManager {
  constructor(scene) {
    this.scene = scene;
    this.messages = [];
  }

  /**
   * @param {string} text
   * @param x
   * @param y
   * @param text
   * @param type - 'info', 'positive' or 'negative'
   */
  createMessage(x, y, text, type) {
    const style = { fontFamily: this.scene.font, fontSize: '20px', backgroundColor: 'rgba(203,219,252,0.8)', padding: 5 };
    const message = new Message(this.scene, text, x, y, style);
    if (type === 'positive') {
      message.message.setColor('#37946e');
    } else if (type === 'negative') {
      message.message.setColor('#AE3737');
    } else if (type === 'info') {
      message.message.setColor('#2B6180');
    }
    this.floatUpMessage(message);
    this.floatUpPreviousMessage(x, y);
    this.messages.push(message);
    this.scene.time.delayedCall(1700, () => this.fadeOutMessage(message) );
    this.scene.time.delayedCall(2000, () => this.destroyMessage(message) );
  }

  floatUpMessage(message) {
    this.scene.tweens.add({targets: message.message, y: message.message.y - 30, duration: 300,});
  }

  floatUpPreviousMessage(x, y) {
    if (this.messages.length > 0) {
      this.messages.forEach((message) => {
        if (message.x === x && message.y === y) {
          message.message.y -= 15;
          this.scene.tweens.add({targets: message.message, y: message.message.y - 30, duration: 300,});
        }
      });
    }
  }

  fadeOutMessage(message) {
    this.scene.tweens.add({targets: message.message, alpha: 0, duration: 300});
  }

  destroyMessage(message) {
    message.message.destroy();
    message = null;
  }
}
