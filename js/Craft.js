export default class Craft {
  constructor(scene) {
    this.scene = scene;
  }

  craftItem(itemName, itemObj) {
    let playerInventory = this.scene.player.inventory;
    let recipe = itemObj.recipe;
    if (this.isEnoughResources(itemObj)) {
      for (let resource in recipe) {
        playerInventory[resource] -= recipe[resource];
      }
      playerInventory[itemName] += 1;
      this.scene.sound.play("craft");
      this.scene.Menu.updateMenu();
    }
  }

  isEnoughResources(itemObj) {
    let playerInventory = this.scene.player.inventory;
    let recipe = itemObj.recipe;
    let enoughResources = true;
    for (let resource in recipe) {
      if (playerInventory[resource] < recipe[resource] || playerInventory[resource] === undefined) {
        enoughResources = false;
      }
    }
    return enoughResources;
  }

  hasRequiredMapObject(itemObj) {
    if (itemObj.requiredMapObject === undefined) return true;
    let requiredMapObject = itemObj.requiredMapObject;
    let hasRequiredMapObject = false;
    this.scene.allObjects.children.iterate((mapObject) => {
      if (mapObject.name === requiredMapObject) {
        hasRequiredMapObject = true;
      }
    });
    return hasRequiredMapObject;
  }
}
