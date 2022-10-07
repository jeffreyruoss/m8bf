export default class BuildManager {
  constructor(scene) {
    this.scene = scene;
    this.prePlaceStructure = null;
  }

  build(key) {
    // get the position of the mouse
    const pointer = this.scene.input.activePointer;

    // pre-placed structure image
    this.prePlaceStructure = this.scene.physics.add.image(pointer.worldX, pointer.worldY, key)
      .setSize(32, 40).setAlpha(0.7).setTint(0xa1ff4b);

    this.scene.input.on('pointerdown', (pointer) => {
      if (this.prePlaceStructure) {

        // destroy the pre-placed structure
        this.prePlaceStructure.destroy();
        this.prePlaceStructure = null;

        // place the actual structure
        const structure = this.scene.physics.add.staticSprite(pointer.worldX, pointer.worldY, key)
          .setSize(64, 64);
        this.scene.sound.play('place-structure');

        this.scene.physics.add.collider(this.scene.player, structure);
      }
    });
  }

  structureInHand() {

  }


}
