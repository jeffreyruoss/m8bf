import Player from './../Player.js';
import PlayerMovement from "./../PlayerMovement.js";
import PlayerActions from "./../PlayerActions.js";
import MapGenerator from "./../MapGenerator.js";
import Menu from "./../menu/Menu.js";
import Craft from "./../Craft.js";
import MessageManager from "./../MessageManager.js";
import Build from "./../Build.js";
import InfoBar from "./../InfoBar.js";
import Mouse from "./../Mouse.js";
import FPS from "./../FPS.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
    this.font = 'earls-revenge';
  }

  preload() {
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.image('grass', './../../img/grass.png');
    this.load.image('tree', './../../img/tree.png');
    this.load.image('iron-mine', './../../img/iron-mine.png');
    this.load.image('workshop', './../../img/workshop.png');
    this.load.image('advancedWorkshop', './../../img/advanced-workshop.png');
    this.load.audio('treeChop', './../../sounds/sfx_sounds_impact6.mp3');
    this.load.audio('treeFall', './../../sounds/sfx_sounds_impact11.mp3');
    this.load.audio('ironMinePick', './../../sounds/sfx_sounds_button3.mp3');
    this.load.audio('ironMineCollect', './../../sounds/sfx_coin_double4.mp3');
    this.load.audio('ironMineDeplete', './../../sounds/sfx_sounds_impact11.mp3');
    this.load.audio('placeStructure', './../../sounds/sfx_wpn_punch3.mp3');
    this.load.audio('craft', './../../sounds/sfx_coin_cluster3.mp3');
    this.load.audio('error', './../../sounds/sfx_sounds_error4.mp3');
    this.load.json('menuJSON', './../../js/menu/menu.json');
    this.load.json('itemsJSON', './../../js/items.json');
  }

  create() {
    this.time.advancedTiming = true;
    this.pointer = this.input.activePointer;

    this.menuJSON = this.cache.json.get('menuJSON');
    this.itemsJSON = this.cache.json.get('itemsJSON');

    this.allObjects = this.add.group();
    this.cameras.main.fadeIn(1000);

    this.sceneWidth = this.sys.game.config.width;
    this.sceneHeight = this.sys.game.config.height;

    this.MapGenerator = new MapGenerator(this);

    this.MapGenerator.generateGrass();

    new Player(this);

    this.cameras.main.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.physics.world.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    this.MapGenerator.generateObjects('iron-mine', 'ironMines', 0.005); // 0.005
    this.MapGenerator.generateObjects('tree', 'trees', 0.07); // 0.07

    this.InfoBar = new InfoBar(this);

    this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE,C,B,ESC,SHIFT");

    this.Mouse = new Mouse(this);

    this.PlayerMovement = new PlayerMovement(this);

    this.PlayerActions = new PlayerActions(this);

    this.Craft = new Craft(this);

    this.MessageManager = new MessageManager(this);

    this.Build = new Build(this);
    this.Build.placeHandler();
    this.Build.cancelHandler();

    this.Menu = new Menu(this);
    this.keys.C.on('down', () => !this.Menu.enabled || this.Menu.toggleMenu(this.Menu.currentPanel) );
    this.keys.ESC.on('down', () => !this.Menu.open || this.Menu.toggleMenu(this.Menu.currentPanel) );

    this.FPS = new FPS(this);

    // this.Menu.createMenu(); // do auto-open menu on start for testing
  }

  update() {
    this.PlayerMovement.playerMove();

    if (this.input.keyboard.checkDown(this.keys.SPACE)) {
      this.PlayerActions.collectTree();
      this.PlayerActions.collectIronMine();
    }

    if (this.Build.prePlaceStructure) {
      if (this.input.keyboard.checkDown(this.keys.SHIFT)) {
        this.Build.prePlaceStructure.x = Math.floor(this.pointer.worldX / 64) * 64;
        this.Build.prePlaceStructure.y = Math.floor(this.pointer.worldY / 64) * 64;
      } else {
        this.Build.prePlaceStructure.x = this.pointer.worldX;
        this.Build.prePlaceStructure.y = this.pointer.worldY;
      }
    }

    this.FPS.update();
  }
}
