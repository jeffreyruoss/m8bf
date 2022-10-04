import Message from "./Message.js";

export default class MessageManager {
  constructor(scene) {
    this.scene = scene;
  }

  createMessage(x, y, text, style) {
    const message = new Message(this.scene, text, x, y, style);
    setTimeout(() => {
      this.destroyMessage(message);
    }, 2000);
  }

  destroyMessage(message) {
    message.message.destroy();
    message = null;
  }
}
