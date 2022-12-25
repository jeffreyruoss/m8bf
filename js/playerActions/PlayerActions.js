import Dialog from './actions/Dialog.js';
import Collect from './actions/Collect.js';
import PickUp from './actions/PickUp.js';
import SmeltMenu from './actions/SmeltMenu.js';
import AutomatonMenu from './actions/AutomatonMenu.js';
import Inspect from './actions/Inspect.js';

export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.Dialog = new Dialog(scene);
    this.Collect = new Collect(scene);
    this.PickUp = new PickUp(scene);
    this.SmeltMenu = new SmeltMenu(scene);
    this.AutomatonMenu = new AutomatonMenu(scene);
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

  smelt() {
    this.SmeltMenu.init();
  }

  automaton() {
    this.AutomatonMenu.init();
  }

  inspect() {
    this.Inspect.inspect();
  }
}
