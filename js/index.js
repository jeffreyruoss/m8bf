import Intro from "./scenes/Intro.js";
import Main from "./scenes/Main.js";

const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth * window.devicePixelRatio, // fit to screen
  height: window.innerHeight * window.devicePixelRatio, // fit to screen
  // width: 256 * 4, // NES * 4
  // height: 240 * 4, // NES * 4
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
