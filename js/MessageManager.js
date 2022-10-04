import Message from "./Message.js";

export default class MessageManager {
  constructor(scene) {
    this.scene = scene;
    this.messages = [];
  }

  createMessage(x, y, text, style) {
    if (this.messages.length > 0) {
      this.messages.forEach((message) => {
        if (message.x === x && message.y === y) {
          message.message.y -= 15;
          this.scene.tweens.add({targets: message.message, y: message.message.y - 30, duration: 300,});
        }
      });
    }
    const message = new Message(this.scene, text, x, y, style);
    this.scene.tweens.add({targets: message.message, y: message.message.y - 30, duration: 300,});
    this.messages.push(message);
    setTimeout(() => {
      this.destroyMessage(message);
    }, 2000);
  }

  destroyMessage(message) {
    message.message.destroy();
    message = null;
  }
}
