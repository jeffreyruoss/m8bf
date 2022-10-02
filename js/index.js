import Intro from "./scenes/Intro.js";
import Main from "./scenes/Main.js";

const config = {
  type: Phaser.CANVAS,
  width: 1024,
  height: 800,
  pixelArt: true,
  // scene: [Intro, Main],
  scene: [Main, Intro],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  title: "M8BF",
  physics: {
    default: "arcade",
    arcade: {
      // debug: true
    }
  }
};

const game = new Phaser.Game(config);
document.game = game; // for debugging
