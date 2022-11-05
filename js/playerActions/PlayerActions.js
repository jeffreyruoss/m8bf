import Dialog from './actions/Dialog.js';
import Collect from './actions/Collect.js';
import PickUp from './actions/PickUp.js';
import Inspect from './actions/Inspect.js';

export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.Dialog = new Dialog(scene);
    this.Collect = new Collect(scene);
    this.PickUp = new PickUp(scene);
    this.Inspect = new Inspect(scene);
  }

  dialog() {
    this.Dialog.dialog();
  }

  collect() {
    this.Collect.collect();
  }

  pickUp() {
    this.PickUp.pickUp();
  }

  inspect() {
    this.Inspect.inspect();
  }
}
