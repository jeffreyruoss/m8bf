export default class BuildManager {
  constructor(scene) {
    this.scene = scene;
    this.prePlaceStructure = null;
  }

  build(structure) {

    // get the position of the mouse
    const pointer = this.scene.input.activePointer;

    // pre-placed structure image
    this.prePlaceStructure = this.scene.physics
      .add.sprite(pointer.worldX, pointer.worldY, structure)
      .setSize(32, 40).setAlpha(0.5);

    this.scene.input.on('pointerdown', (pointer) => {
      if (this.prePlaceStructure) {

        // destroy the pre-placed structure
        this.prePlaceStructure.destroy();
        this.prePlaceStructure = null;

        // place the actual structure
        this.scene.physics
          .add.sprite(pointer.worldX, pointer.worldY, structure)
          .setSize(32, 40);
        this.scene.sound.play('place-structure');
      }
    });




    // if (this.scene.player.inventory[this.scene.craftBox.selectedItem] > 0) {
    //   if (this.scene.craftBox.selectedItem === 'workshop') {
    //     this.scene.mapGenerator.generateObjects('workshop', 'workshops', 0, pointer.worldX, pointer.worldY);
    //     this.scene.player.inventory[this.scene.craftBox.selectedItem]--;
    //   }
    // }
  }

  structureInHand() {

  }


}
