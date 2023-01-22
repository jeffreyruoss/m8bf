export default class AutomatonMenuInfo {
  constructor(scene) {
    this.scene = scene;
  }

  static init(scene, currentObject, actionMenu, x, y, buttonStyle) {
    this.scene = scene;
    this.automatonMenuItems = actionMenu.actionMenuItems;

    const addPickUpButton = this.scene.add.text(x, y, 'Pick up Automaton', buttonStyle);
    this.automatonMenuItems.add(addPickUpButton);
    addPickUpButton.setInteractive();
    this.scene.Mouse.buttonHover(addPickUpButton);
    addPickUpButton.on('pointerdown', () => {
      currentObject.destroy();
      this.scene.player.inventory.automaton += 1;
      actionMenu.actionMenuClose();
      this.scene.MessageManager.createMessage(this.scene.pointer.worldX, this.scene.pointer.worldY, 'Automaton added to your inventory', 'positive');
    });

    const addAssignButton = this.scene.add.text(x, y + 60, 'Assign task', buttonStyle);
    this.automatonMenuItems.add(addAssignButton);
    addAssignButton.setInteractive();
    this.scene.Mouse.buttonHover(addAssignButton);

    addAssignButton.on('pointerdown', () => {
      actionMenu.actionMenuClose();
      currentObject.assignTask(currentObject);
    });
  }
}
