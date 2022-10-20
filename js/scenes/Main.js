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
import Automaton from "./../Automaton.js";
import AutomatonMovement from "./../AutomatonMovement.js";
import FPS from "./../FPS.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
    this.font = 'earls-revenge';
    this.sceneSizeMultiplier = 4;
  }

  preload() {
    this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Generating world...', { fontFamily: this.font, fontSize: 32 }).setOrigin(0.5);
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.aseprite('automaton', './../../img/automaton-wood.png', './../../img/automaton.json');
    this.load.image('grass', './../../img/grass.png');
    this.load.image('tree', './../../img/tree.png');
    this.load.image('ironOreDeposit', './../../img/iron-ore-deposit.png');
    this.load.image('ironMine', './../../img/iron-mine.png');
    this.load.image('stone', './../../img/stone.png');
    this.load.image('chest', './../../img/chest.png');
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
    this.load.json('mapObjectsJSON', './../../js/map-objects.json');
  }

  create(data) {
    this.data = data;
    this.savedGameData = data.loadGame ? JSON.parse(localStorage.getItem('m8bf')) : null;

    this.time.advancedTiming = true;
    this.pointer = this.input.activePointer;

    this.menuJSON = this.cache.json.get('menuJSON');
    this.itemsJSON = this.cache.json.get('itemsJSON');
    this.mapObjectsJSON = this.cache.json.get('mapObjectsJSON');

    this.allObjects = this.add.group();

    this.sceneWidth = this.sys.game.config.width * this.sceneSizeMultiplier;
    this.sceneHeight = this.sys.game.config.height * this.sceneSizeMultiplier;

    this.MapGenerator = new MapGenerator(this);

    this.MapGenerator.generateGrass();

    new Player(this);

    this.cameras.main.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
    this.physics.world.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    this.InfoBar = new InfoBar(this);

    this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE,C,B,I,ESC,SHIFT");

    this.Mouse = new Mouse(this);

    this.PlayerMovement = new PlayerMovement(this);

    this.PlayerActions = new PlayerActions(this);
    this.PlayerActions.inspect();

    this.Craft = new Craft(this);

    this.MessageManager = new MessageManager(this);

    this.Build = new Build(this);
    this.Build.placeHandler();
    this.Build.cancelHandler();

    this.Menu = new Menu(this);
    this.keys.C.on('down', () => !this.Menu.enabled || this.Menu.toggleMenu(this.Menu.currentPanel) );
    this.keys.ESC.on('down', () => !this.Menu.open || this.Menu.toggleMenu(this.Menu.currentPanel) );

    this.cameras.main.fadeIn(500);

    this.MapGenerator.generateObjects('ironOreDeposit', 'ironOreDeposits', );
    this.MapGenerator.generateObjects('stone', 'stones', );
    this.MapGenerator.generateObjects('tree', 'trees', );



    // temp automaton for testing
    this.automaton1 = new Automaton(this);

    // Automaton Movement init
    this.AutomatonMovement = new AutomatonMovement(this);
    this.AutomatonMovement.setup();



    // TESTING
    // this.FPS = new FPS(this, 'bottom-left');
    // this.Menu.createMenu(); // do auto-open menu

  }

  update() {
    this.PlayerMovement.playerMove();

    if (this.input.keyboard.checkDown(this.keys.SPACE)) this.PlayerActions.collect();

    this.Build.update();

    // this.FPS.update();
  }
}
