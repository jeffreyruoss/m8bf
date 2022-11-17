export default class TreeGrowth {
  constructor(scene) {
    this.scene = scene;
    this.timer = 1000;
    this.secondsBetweenGrowth = 10;
    this.shrineBonusMultiplier = 2;
    this.counter = 0;
  }

  update() {
    if (this.scene.time.now > this.timer) {
      if (this.counter > 9 && this.counter % this.secondsBetweenGrowth === 0) {
        this.scene.allObjects.children.iterate((object) => {
          if (object && object.name === 'sapling') {
            this.scene.time.delayedCall(1, () => {
              this.growToJuvenileTree(object);
            });
          } else if (object && object.name === 'juvenileTree') {
            this.scene.time.delayedCall(1, () => {
              this.growToTree(object);
              this.growToJuvenileTree(object);
            });
          }
        });
      }
      this.counter += 1;
      this.timer = this.scene.time.now + 1000;
    }
  }

  growToTree(object) {
    const width = this.scene.textures.get('tree').getSourceImage().width;
    const height = this.scene.textures.get('tree').getSourceImage().height;
    object.destroy();
    this.scene.MapGenerator.generateObject('tree', 'trees', object.x, object.y, width, height, this.scene.mapObjectsJSON.tree, true);
  }

  growToJuvenileTree(object) {
    const width = this.scene.textures.get('juvenileTree').getSourceImage().width;
    const height = this.scene.textures.get('juvenileTree').getSourceImage().height;
    object.destroy();
    this.scene.MapGenerator.generateObject('juvenileTree', 'juvenileTrees', object.x, object.y, width, height, this.scene.mapObjectsJSON.juvenileTree, true);
  }
}
