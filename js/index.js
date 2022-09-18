import Intro from "./scenes/Intro.js";
import Main from "./scenes/Main.js";

const config = {
  type: Phaser.CANVAS,
  width: 256,
  height: 200,
  pixelArt: true,
  scene: [Intro, Main],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      // debug: true
    }
  }
};

const index = new Phaser.Game(config);
