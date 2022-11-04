export default class PlayerActions {
  constructor(scene) {
    this.scene = scene;
    this.collectTime = 0;
    this.dialogueActive = false;
    this.dialogueText = '';
    this.dialogueStep = 0;
    this.dialogueLength = 0;
  }

  dialogue() {
    this.scene.allObjects.children.iterate((object) => {
      if (object.name === 'player') return;
      const playerBounds = this.scene.player.getBounds();
      const objectBounds = object.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
        if (object.name === 'npc') {
          if (this.dialogueActive === false) {
            this.dialogueActive = true;
            this.dialogueLength = Object.keys(this.scene.dialogJSON["0"]).length;
            this.scene.player.enabled = false;
            const width = this.scene.cameras.main.width - 60;
            const height = 100;
            const x = this.scene.cameras.main.worldView.x + 30;
            const y = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height - height - 30;
            this.dialogBox = this.scene.add.rectangle(x, y, width, height, 0xffffff, 1);
            this.dialogBox.setOrigin(0);
            this.dialogBox.setDepth(5);
            this.dialogText = this.scene.add.text(x + 10, y + 10, this.scene.dialogJSON["0"][this.dialogueStep], { fontFamily: this.scene.font, fontSize: 24 , fill: '#000000' });
            this.dialogText.setDepth(5);
          } else if (this.dialogueStep + 1 < this.dialogueLength){
            this.dialogueStep += 1;
            this.dialogText.setText(this.scene.dialogJSON["0"][this.dialogueStep]);
          } else {
            this.dialogueActive = false;
            this.dialogueStep = 0;
            this.scene.player.enabled = true;
            this.dialogBox.destroy();
            this.dialogText.destroy();
          }
        }
      }
    });
  }

  collect() {
    this.scene.allObjects.children.iterate((object) => {
      if (object && object.name === 'player') return;
      if (object && this.scene.time.now > this.collectTime) {
        const playerBounds = this.scene.player.getBounds();
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
          let collectionSpeed = this.scene.player.attributes.collectionSpeed[object.name];

          const objectJSON = this.scene.mapObjectsJSON[object.name];
          if (objectJSON === undefined) return;

          // Requirement rules
          if (objectJSON.requires !== undefined && objectJSON.requires === "mine") {
            if (object.data.get('mine') <= 0) {
              const message = 'Build a mine to extract ore';
              this.scene.MessageManager.createMessage(object.x, object.y, message, 'info');
              this.collectTime = this.scene.time.now + collectionSpeed;
              return;
            }
          }

          let harvestTickSound, collectSound, depletedSound;

          if (objectJSON.harvestType === 'tree') {
            harvestTickSound = 'treeChop';
            depletedSound = 'treeFall';
          } else if (objectJSON.harvestType === 'mine') {
            harvestTickSound = 'ironMinePick';
            collectSound = 'ironMineCollect';
            depletedSound = 'ironMineDeplete';
          } else {
            return;
          }

          object.data.set('harvestTicks', object.data.get('harvestTicks') + 1);
          if (object.data.get('harvestTicks') >= 5) {
            let message;
            object.data.set(objectJSON.resource.key, object.data.get(objectJSON.resource.key) - 1);
            this.scene.player.inventory[objectJSON.resource.key] += 1;
            message = `+1 ${objectJSON.resource.name}`;
            this.scene.MessageManager.createMessage(object.x, object.y, message, 'positive');
            object.data.set('harvestTicks', 0);
            if (object.data.get(objectJSON.resource.key) <= 0) {
              object.destroy();
              this.scene.sound.play(depletedSound);
              if (objectJSON.harvestType === 'mine') {
                this.scene.time.delayedCall(300, () => {
                  message = `${objectJSON.resource.name} is depleted`;
                  this.scene.MessageManager.createMessage(object.x, object.y, message, 'negative');
                });
              }
            } else {
              this.scene.sound.play(collectSound);
            }
          } else {
            this.scene.sound.play(harvestTickSound);
          }

          this.collectTime = this.scene.time.now + collectionSpeed;
        }
      }
    });
  }

  pickUp() {
    this.scene.allObjects.children.iterate((object) => {
      if (object && object.name === 'player') return;
      if (object) {
        const playerBounds = this.scene.player.getBounds();
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, objectBounds)) {
          if (this.scene.mapObjectsJSON[object.name] !== undefined) {
            if (this.scene.mapObjectsJSON[object.name].pickUp) {
          this.scene.sound.play('pickUp');
          this.scene.player.inventory[object.name] += 1;
          const message = `+1 ${this.scene.mapObjectsJSON[object.name].name}`;
          this.scene.MessageManager.createMessage(object.x, object.y, message, 'positive');
          object.destroy();
        }
      }
        }
      }
    });
  }

  inspect() {
    this.scene.keys.I.on('down', () => {
      const playerBounds = this.scene.player.getBounds();
      const inspectBounds = new Phaser.Geom.Rectangle(playerBounds.x, playerBounds.y, playerBounds.width, playerBounds.height);
      if (this.scene.player.direction === 'up') {
        inspectBounds.y -= 16;
      }
      if (this.scene.player.direction === 'down') {
        inspectBounds.y += 16;
      }
      if (this.scene.player.direction === 'left') {
        inspectBounds.x -= 16;
      }
      if (this.scene.player.direction === 'right') {
        inspectBounds.x += 16;
      }
      this.scene.allObjects.children.iterate((object) => {
        if (object.name === 'player') return;
        const objectBounds = object.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(inspectBounds, objectBounds)) {
          console.log('---------------------');
          console.log('this object\'s name:', object.name);
          console.log('This object\'s data: ', object.data.list);
          console.log('This object\'s full object: ', object);
          console.log('---------------------');
        }
      });
    });

  }
}
