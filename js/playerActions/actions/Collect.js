export default class Collect {
  constructor(scene) {
    this.scene = scene;
    this.collectTime = 0;
  }

  collect() {
    this.scene.allObjects.children.iterate((object) => {
      if (object === undefined) return;
      const objectJSON = this.scene.mapObjectsJSON[object.name];
      if (objectJSON === undefined) return;
      if (objectJSON.harvestType === undefined) return;

      if (this.scene.time.now > this.collectTime) {
        const playerBounds = this.scene.player.getBounds();
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
          let collectionSpeed = this.scene.player.attributes.collectionSpeed[object.name];

          if (!this.mapObjectHasRequirements(object, objectJSON, collectionSpeed)) return;

          if (!this.playerHasRequirements(object, objectJSON, collectionSpeed)) return;

          if (objectJSON.harvestType === 'tree') {
            this.harvestTree(object, objectJSON);
          } else if (objectJSON.harvestType === 'mine') {
            this.harvestMine(object, objectJSON);
          }

          this.collectTime = this.scene.time.now + collectionSpeed;
        }
      }
    });
  }

  mapObjectHasRequirements(object, objectJSON, collectionSpeed) {
    let hasRequirements = true;
    if (objectJSON.objectRequires !== undefined) {
      const requirements = objectJSON.objectRequires;
      for (const [key, value] of Object.entries(requirements)) {
        if (object.data.get(key) < value.amount) {
          this.scene.MessageManager.createMessage(object.x, object.y, value.message, 'info');
          this.collectTime = this.scene.time.now + collectionSpeed;
          return false;
        }
      }
    }
    return hasRequirements;
  }

  playerHasRequirements(object, objectJSON, collectionSpeed) {
    // Player requirement rules for the OR logic (need to have one of the requirements)
    let hasRequirements = true;
    if (objectJSON.playerRequires !== undefined) {
      const requirements = objectJSON.playerRequires.items;
      const playerInventory = this.scene.player.inventory;
      let hasRequirement = false;
      for (const [key, value] of Object.entries(requirements)) {
        if (playerInventory[key] >= value.amount) {
          hasRequirement = true;
        }
      }
      if (!hasRequirement) {
        this.scene.MessageManager.createMessage(object.x, object.y, objectJSON.playerRequires.message, 'info');
        this.collectTime = this.scene.time.now + collectionSpeed;
        return false;
      }
    }
    return hasRequirements;
  }

  harvestTree(object, objectJSON) {
    object.data.set('harvestTicks', object.data.get('harvestTicks') + 1);
    if (object.data.get('harvestTicks') >= objectJSON.totalHarvestTicks) {
      this.scene.sound.play('treeFall');
      this.scene.player.inventory.wood += object.data.get('wood');
      this.scene.MessageManager.createMessage(object.x, object.y, `+${object.data.get('wood')} Wood`, 'positive');
      object.destroy();
    }
    this.scene.sound.play('treeChop');
  }

  harvestMine(object, objectJSON) {
    object.data.set('harvestTicks', object.data.get('harvestTicks') + 1);
    if (object.data.get('harvestTicks') >= objectJSON.totalHarvestTicks) {
      object.data.set(objectJSON.resource.key, object.data.get(objectJSON.resource.key) - 1);
      this.scene.player.inventory[objectJSON.resource.key] += 1;
      if (object.data.get(objectJSON.resource.key) <= 0) {
        this.scene.sound.play('ironMineDeplete');
        this.scene.player.inventory[objectJSON.resource.key] += 1;
        object.destroy();
        this.scene.MessageManager.createMessage(object.x, object.y, `+1 ${objectJSON.resource.name}`, 'positive');
        this.scene.time.delayedCall(300, () => {
          this.scene.MessageManager.createMessage(object.x, object.y, `${objectJSON.name} is depleted`, 'info');
        });
      } else {
        this.scene.sound.play('ironMineCollect');
        object.data.set('harvestTicks', 0);
        this.scene.MessageManager.createMessage(object.x, object.y, `+1 ${objectJSON.resource.name}`, 'positive');
      }
    }
    this.scene.sound.play('ironMinePick');
  }
}
