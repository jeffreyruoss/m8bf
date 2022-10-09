import Message from "./Message.js";

export default class MessageManager {
  constructor(scene) {
    this.scene = scene;
    this.messages = [];
  }

  /**
   * @param x
   * @param y
   * @param text - The text to display
   * @param type - 'info', 'positive' or 'negative'
   */
  createMessage(x, y, text, type) {
    const message = new Message(this.scene, text, x, y, type);
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
