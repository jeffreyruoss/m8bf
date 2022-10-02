export default class Craft {
  constructor(scene) {
    this.scene = scene;
  }

  craftItem(itemName, itemObj) {
    let playerInventory = this.scene.player.inventory;
    let recipe = itemObj.recipe;
    let enoughResources = true;
    for (let resource in recipe) {
      if (playerInventory[resource] < recipe[resource]) {
        enoughResources = false;
      }
    }
    if (enoughResources) {
      for (let resource in recipe) {
        playerInventory[resource] -= recipe[resource];
      }
      playerInventory[itemName] += 1;
      console.log(`You crafted ${itemName}!`);
      this.scene.sound.play("craft");
      this.scene.craftBox.updateCraftBox();
    } else {
      console.log("not enough resources");
    }
  }
}
