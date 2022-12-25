import Dialog from './actions/Dialog.js';
import Collect from './actions/Collect.js';
import PickUp from './actions/PickUp.js';
import ActionMenu from './actions/ActionMenu.js';
import Inspect from './actions/Inspect.js';

export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.Dialog = new Dialog(scene);
    this.Collect = new Collect(scene);
    this.PickUp = new PickUp(scene);
    this.ActionMenu = new ActionMenu(scene);
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

  actionMenu() {
    this.ActionMenu.init();
  }

  inspect() {
    this.Inspect.inspect();
  }
}
