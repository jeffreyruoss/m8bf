import Intro from "./scenes/Intro.js";
import Main from "./scenes/Main.js";

const config = {
  type: Phaser.WEBGL,

  // Uncomment the following 2 lines for Fullscreen mode
  // width: window.innerWidth * window.devicePixelRatio,
  // height: window.innerHeight * window.devicePixelRatio,

  // Uncomment the following 4 lines for NES screen size mode (256x240 * 4)
  width: 256 * 4, // NES * 4
  height: 240 * 4, // NES * 4
  maxWidth: 256 * 4, // NES * 4
  maxHeight: 240 * 4, // NES * 4

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
