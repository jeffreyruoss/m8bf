export default class TreeGrowth {
  constructor(scene) {
    this.scene = scene;
    this.timer = 1000;
    this.secondsBetweenGrowth = 10;
    this.shrineBonusMultiplier = 2;
    this.counter = 0;
    this.saplingWidth = this.scene.textures.get('sapling').getSourceImage().width;
    this.saplingHeight = this.scene.textures.get('sapling').getSourceImage().height;
    this.juvenileTreeWidth = this.scene.textures.get('juvenileTree').getSourceImage().width;
    this.juvenileTreeHeight = this.scene.textures.get('juvenileTree').getSourceImage().height;
    this.treeWidth = this.scene.textures.get('tree').getSourceImage().width;
    this.treeHeight = this.scene.textures.get('tree').getSourceImage().height;
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
          } else if (object && object.name === 'natureShrine') {
            this.scene.time.delayedCall(1, () => {
              this.createShrineSaplings(object);
            });
          }
        });
        this.createSaplings();
      }
      this.counter += 1;
      this.timer = this.scene.time.now + 1000;
    }
  }

  growToTree(object) {
    object.destroy();
    this.scene.MapGenerator.generateObject('tree', 'trees', object.x, object.y, this.treeWidth, this.treeHeight, this.scene.mapObjectsJSON.tree, true);
  }

  growToJuvenileTree(object) {
    object.destroy();
    this.scene.MapGenerator.generateObject('juvenileTree', 'juvenileTrees', object.x, object.y, this.juvenileTreeWidth, this.juvenileTreeHeight, this.scene.mapObjectsJSON.juvenileTree, true);
  }

  createShrineSaplings(natureShrine) {
    const growthRadius = 100;
    const saplingsPerGrowth = 5;
    for (let i = 0; i < saplingsPerGrowth; i++) {
      const x = Phaser.Math.Between(natureShrine.x - growthRadius, natureShrine.x + growthRadius);
      const y = Phaser.Math.Between(natureShrine.y - growthRadius, natureShrine.y + growthRadius);
      this.scene.MapGenerator.generateObject('sapling', 'saplings', x, y, this.saplingWidth, this.saplingHeight, this.scene.mapObjectsJSON.sapling, true);
    }
  }

  createSaplings() {
    const saplingsPerGrowth = 1;
    for (let i = 0; i < saplingsPerGrowth; i++) {
      const x = Phaser.Math.Between(0, this.scene.sceneWidth);
      const y = Phaser.Math.Between(0, this.scene.sceneHeight);
      this.scene.MapGenerator.generateObject('sapling', 'saplings', x, y, this.saplingWidth, this.saplingHeight, this.scene.mapObjectsJSON.sapling, true);
    }
  }
}
