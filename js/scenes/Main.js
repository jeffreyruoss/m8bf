import Player from './../Player.js';
import PlayerMovement from "./../PlayerMovement.js";
import PlayerActions from "./../PlayerActions.js";
import MapGenerator from "./../MapGenerator.js";
import CraftBox from "./../CraftBox.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  preload() {
    this.time.advancedTiming = true;
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.image('grass', './../../img/grass.png');
    this.load.image('tree', './../../img/tree.png');
    this.load.image('iron-mine', './../../img/iron-mine.png');
    this.load.audio('treeChop', './../../sounds/sfx_sounds_impact6.mp3');
    this.load.audio('treeFall', './../../sounds/sfx_sounds_impact11.mp3');
    this.load.audio('ironMinePick', './../../sounds/sfx_sounds_button3.mp3');
    this.load.audio('ironMineCollect', './../../sounds/sfx_coin_double4.mp3');
    this.load.audio('ironMineDeplete', './../../sounds/sfx_sounds_impact11.mp3');
    this.load.json('items', './../../js/items.json');
  }

  create() {
    this.items = this.cache.json.get('items');

    this.allObjects = this.add.group();
    this.cameras.main.fadeIn(1000);

    this.sceneWidth = this.sys.game.config.width;
    this.sceneHeight = this.sys.game.config.height;

    this.mapGenerator = new MapGenerator(this);

    this.mapGenerator.generateGrass();

    new Player(this);

    this.cameras.main.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.physics.world.setBounds(0, 0, this.sceneWidth * 4, this.sceneHeight * 4);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player);

    this.mapGenerator.generateObjects('iron-mine', 'ironMines', 0.005);
    this.mapGenerator.generateObjects('tree', 'trees', 0.07);

    this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE,C");

    this.playerMovement = new PlayerMovement(this);

    this.playerActions = new PlayerActions(this);

    this.craftBox = new CraftBox(this);

    this.keys.C.on('down', () => {
      this.craftBox.toggleCraftBox();
    });

    // this.craftBox.createCraftBox(); // do auto-open craftbox on start for testing
  }

  update() {
    this.playerMovement.playerMove();

    if (this.input.keyboard.checkDown(this.keys.SPACE)) {
      this.playerActions.collectTree();
      this.playerActions.collectIronMine();
    }
  }
}
