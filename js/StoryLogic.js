export default class StoryLogic {
  constructor(scene) {
    this.scene = scene;
  }

  npcsBeforeDialog(npc) {
    const npcKey = npc.data.get('npcKey');

    if (npcKey === 'markusTheGray' && npc.data.get('dialogNumber') === 0) {
      if (this.scene.player.inventory.wood >= 1 && this.scene.player.inventory.stone >= 1) {
        npc.data.set('dialogNumber', 1);
        npc.data.set('dialogStatus', 'initial');
      }
    }

    if (npcKey === 'markusTheGray' && npc.data.get('dialogNumber') === 1) {
      if (this.scene.player.inventory.stoneAxe >= 1) {
        npc.data.set('dialogNumber', 2);
        npc.data.set('dialogStatus', 'initial');
      }
    }

    if (npcKey === 'markusTheGray' && npc.data.get('dialogNumber') === 2) {
      if (this.scene.player.inventory.workbench >= 1) {
        npc.data.set('dialogNumber', 3);
        npc.data.set('dialogStatus', 'initial');
      }
    }

    if (npcKey === 'markusTheGray' && npc.data.get('dialogNumber') === 3) {
      let workbench = false;
      this.scene.allObjects.children.iterate((object) => {
        if (object.name === 'workbench') {
          workbench = true;
        }
      });
      if (workbench) {
        npc.data.set('dialogNumber', 4);
        npc.data.set('dialogStatus', 'initial');
      }
    }
  }

  npcsAfterDialog(npc) {
    const npcKey = npc.data.get('npcKey');

    if (npcKey === 'markusTheGray' && npc.data.get('dialogNumber') === 1 && npc.data.get('dialogStatus') === 'initial') {
      this.scene.InfoBar.createInfoBar(['Go to Craft in the menu to craft a Stone Ax.']);
      this.scene.time.delayedCall(10000, () => {
        this.scene.InfoBar.destroyInfoBar();
      });
    }

    if (npcKey === 'markusTheGray' && npc.data.get('dialogNumber') === 3 && npc.data.get('dialogStatus') === 'initial') {
      this.scene.InfoBar.createInfoBar(['Go to Workbench in your inventory and place the workbench on the ground.']);
      this.scene.time.delayedCall(10000, () => {
        this.scene.InfoBar.destroyInfoBar();
      });
    }
  }
}
