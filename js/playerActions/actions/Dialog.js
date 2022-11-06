export default class Dialog {
  constructor(scene) {
    this.scene = scene;
    this.dialogueActive = false;
    this.dialogueStep = 0;
    this.dialogueLength = 0;
  }

  dialog() {
    const npc = this.checkForNpc();
    if (npc) {
      this.scene.StoryLogic.npcsBeforeDialog(npc);
      const npcKey = npc.data.get('npcKey');
      const npcName = npc.data.get('npcName');
      const dialogNumber = npc.data.get('dialogNumber');
      const dialogStatus = npc.data.get('dialogStatus');
      const dialog = this.scene.dialogJSON[npcKey].dialog[dialogNumber][dialogStatus];
      if (this.dialogueActive === false) {
        this.startDialog(dialog, npcName);
      } else if (this.dialogueStep + 1 < this.dialogueLength){
        this.continueDialog(dialog);
      } else {
        this.finishDialog(dialogStatus, npc);
      }
    }
  }

  checkForNpc() {
    let npc = false;
    this.scene.allObjects.children.iterate((object) => {
      if (object.name === 'player') return;
      const playerBounds = this.scene.player.getBounds();
      const objectBounds = object.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
        if (object.name === 'npc') {
          npc = object;
        }
      }
    });
    return npc;
  }

  startDialog(dialog, npcName) {
    this.dialogueActive = true;
    this.dialogueLength = Object.keys(dialog).length;
    this.scene.player.enabled = false;
    const width = this.scene.cameras.main.width - 60;
    const height = 150;
    const x = this.scene.cameras.main.worldView.x + 30;
    const y = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height - height - 80;
    this.dialogBox = this.scene.add.rectangle(x, y, width, height, 0xffffff, 1);
    this.dialogBox.setOrigin(0);
    this.dialogBox.setDepth(5);
    let style = { fontFamily: this.scene.font, fontSize: 22 , fill: '#386483' };
    this.dialogNpcName = this.scene.add.text(x + 15, y + 15, npcName, style);
    this.dialogNpcName.setDepth(5);
    this.dialogNpcName.line = this.scene.add.line(x + 15, y + 50, 0, 0, this.dialogNpcName.width + 50, 0, 0x386483, 1);
    this.dialogNpcName.line.setDepth(5);
    this.dialogNpcName.line.alpha = 0.3;
    this.dialogNpcName.line.setOrigin(0);
    style = { fontFamily: this.scene.font, fontSize: 24 , fill: '#000000' };
    this.dialogText = this.scene.add.text(x + 15, y + 65, dialog[this.dialogueStep], style);
    this.dialogText.setDepth(5);
  }

  continueDialog(dialog) {
    this.dialogueStep += 1;
    this.dialogText.setText(dialog[this.dialogueStep]);
  }

  finishDialog(dialogStatus, npc) {
    this.dialogueActive = false;
    this.dialogueStep = 0;
    this.scene.player.enabled = true;
    this.dialogBox.destroy();
    this.dialogNpcName.destroy();
    this.dialogNpcName.line.destroy();
    this.dialogText.destroy();
    if (dialogStatus === 'initial') {
      this.scene.StoryLogic.npcsAfterDialog(npc);
      npc.data.set('dialogStatus', 'return');
    }
  }
}
