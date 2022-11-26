export default class Smelt {
  constructor(scene) {
    this.scene = scene;
    this.timer = 0;
    this.smeltingTime = 10000; // milliseconds
  }

  update() {
    if (this.timer < 60) {
      this.timer += 1;
      return;
    }
    this.timer = 0;
    console.log('every second loop through the furnaces');
    this.scene.furnaces.children.iterate((object) => {
      if (object.data.list.wood > 0 && object.data.list.ironOre > 0 && !object.data.list.smelting) {
        console.log('start smelting on this furnace');
        object.data.list.smelting = true;
        object.data.list.smeltStartTime = this.scene.time.now;
      } else if (object.data.list.smelting) {
        console.log('here is a furnace that is smelting');
        if (object.data.list.smeltStartTime + this.smeltingTime < this.scene.time.now) {
          object.data.list.wood -= 1;
          object.data.list.ironOre -= 1;
          object.data.list.iron += 1;
          object.data.list.smelting = false;
          console.log('smelting is done');
          console.log(object.data.list);
        }
      }
    });
  }
}
