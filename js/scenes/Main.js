import StoryLogic from './../StoryLogic.js';
import Player from './../Player.js';
import PlayerFadeIn from "./../PlayerFadeIn.js";
import PlayerMovement from "./../PlayerMovement.js";
import PlayerActions from "./../playerActions/PlayerActions.js";
import MapGenerator from "./../MapGenerator.js";
import Menu from "./../menu/Menu.js";
import Craft from "./../Craft.js";
import MessageManager from "./../MessageManager.js";
import Place from "./../Place.js";
import InfoBar from "./../InfoBar.js";
import Mouse from "./../Mouse.js";
import Automaton from "./../Automaton.js";
import AutomatonMovement from "./../AutomatonMovement.js";
import TreeGrowth  from "./../TreeGrowth.js";
import Smelt from "./../Smelt.js";
import FPS from "./../FPS.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
    this.font = 'earls-revenge';
    this.sceneSizeMultiplier = 1.5;

    // for debugging
    document.scene = this;
  }

  preload() {
    this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Generating world...', { fontFamily: this.font, fontSize: 32 }).setOrigin(0.5);
    this.load.aseprite('player', './../../img/player.png', './../../img/player.json');
    this.load.aseprite('automaton', './../../img/automaton-wood.png', './../../img/automaton.json');
    this.load.aseprite('npc', './../../img/npc.png', './../../img/npc.json');
    this.load.image('grass', './../../img/grass.png');
    this.load.image('tree', './../../img/tree.png');
    this.load.image('juvenileTree', './../../img/juvenile-tree.png');
    this.load.image('sapling', './../../img/sapling.png');
    this.load.image('ironOreDeposit', './../../img/iron-ore-deposit.png');
    this.load.image('ironMine', './../../img/iron-mine.png');
    this.load.image('crystalMine', './../../img/crystal-mine.png');
    this.load.image('stoneFormation', './../../img/stone-formation.png');
    this.load.image('crystalDeposit', './../../img/crystal-deposit.png');
    this.load.image('chest', './../../img/chest.png');
    this.load.image('workbench', './../../img/workbench.png');
    this.load.image('workshop', './../../img/workshop.png');
    this.load.image('advancedWorkshop', './../../img/advanced-workshop.png');
    this.load.image('furnace', './../../img/furnace.png');
    this.load.image('natureShrine', './../../img/nature-shrine.png');
    this.load.image('stoneAxe', './../../img/stone-axe.png');
    this.load.image('ironAxe', './../../img/iron-axe.png');
    this.load.image('stonePickaxe', './../../img/stone-pickaxe.png');
    this.load.image('ironPickaxe', './../../img/iron-pickaxe.png');
    this.load.image('wood', './../../img/wood.png');
    this.load.image('stone', './../../img/stone.png');
    this.load.image('ironOre', './../../img/iron-ore.png');
    this.load.image('iron', './../../img/iron.png');
    this.load.image('crystal', './../../img/crystal.png');
    // this.load.audio('music', './../../sounds/painful-memories-compressed.mp3');
    this.load.audio('portal', './../../sounds/sfx_movement_portal1.mp3');
    this.load.audio('treeChop', './../../sounds/sfx_sounds_impact6.mp3');
    this.load.audio('treeFall', './../../sounds/sfx_sounds_impact11.mp3');
    this.load.audio('ironMinePick', './../../sounds/sfx_sounds_button3.mp3');
    this.load.audio('ironMineCollect', './../../sounds/sfx_coin_double4.mp3');
    this.load.audio('ironMineDeplete', './../../sounds/sfx_sounds_impact11.mp3');
    this.load.audio('placeStructure', './../../sounds/sfx_wpn_punch3.mp3');
    this.load.audio('craft', './../../sounds/sfx_coin_cluster3.mp3');
    this.load.audio('error', './../../sounds/sfx_sounds_error4.mp3');
    this.load.audio('pickUp', './../../sounds/sfx_movement_ladder2a.mp3');
    this.load.json('menuJSON', './../../js/menu/menu.json');
    this.load.json('itemsJSON', './../../js/items.json');
    this.load.json('mapObjectsJSON', './../../js/map-objects.json');
    this.load.json('dialogJSON', './../../js/dialog.json');
  }

  create(data) {
    this.data = data;
    this.savedGameData = data.loadGame ? JSON.parse(localStorage.getItem('m8bf')) : null;

    this.time.advancedTiming = true;
    this.pointer = this.input.activePointer;

    this.menuJSON = this.cache.json.get('menuJSON');
    this.itemsJSON = this.cache.json.get('itemsJSON');
    this.mapObjectsJSON = this.cache.json.get('mapObjectsJSON');
    this.dialogJSON = this.cache.json.get('dialogJSON');

    this.StoryLogic = new StoryLogic(this);

    this.allObjects = this.add.group();

    this.sceneWidth = this.sys.game.config.width * this.sceneSizeMultiplier;
    this.sceneHeight = this.sys.game.config.height * this.sceneSizeMultiplier;

    this.MapGenerator = new MapGenerator(this);

    this.MapGenerator.generateGrass();

    this.player = new Player(this, this.sceneWidth / 2, this.sceneHeight / 2);

    this.cameras.main.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
    this.physics.world.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
    this.player.setCollideWorldBounds('true');
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.InfoBar = new InfoBar(this);

    this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE,C,B,I,ESC,SHIFT");

    this.Mouse = new Mouse(this);

    this.PlayerMovement = new PlayerMovement(this);

    this.PlayerActions = new PlayerActions(this);
    this.PlayerActions.inspect();

    this.Craft = new Craft(this);

    this.MessageManager = new MessageManager(this);

    this.Place = new Place(this);
    this.Place.placeHandler();
    this.Place.cancelHandler();

    this.Menu = new Menu(this);
    this.keys.C.on('down', () => !this.Menu.enabled || this.Menu.toggleMenu(this.Menu.currentPanel) );
    this.keys.ESC.on('down', () => !this.Menu.open || this.Menu.toggleMenu(this.Menu.currentPanel) );

    // this.cameras.main.fadeIn(2000);

    this.MapGenerator.generateObjects('ironOreDeposit', 'ironOreDeposits');
    this.MapGenerator.generateObjects('stoneFormation', 'stoneFormations');
    this.MapGenerator.generateObjects('tree', 'trees');
    this.MapGenerator.generateObjects('sapling', 'saplings');
    this.MapGenerator.generateObjects('juvenileTree', 'juvenileTrees');
    this.MapGenerator.generateObjects('crystalDeposit', 'crystalDeposits');
    this.MapGenerator.generateObjects('workshop', 'workshops');
    this.MapGenerator.generateObjects('ironMine', 'ironMines');
    this.MapGenerator.generateObjects('chest', 'chests');
    this.MapGenerator.generateObjects('stone', 'stone');
    this.MapGenerator.generateObjects('wood', 'wood');
    this.MapGenerator.generateObjects('workbench', 'workbenches');
    this.MapGenerator.generateObjects('furnace', 'furnaces');
    this.MapGenerator.generateObjects('natureShrine', 'natureShrines');
    this.MapGenerator.generateObjects('crystalMine', 'crystalMines');

    this.TreeGrowth = new TreeGrowth(this);

    this.Smelt = new Smelt(this);

    this.anims.createFromAseprite('npc');
    this.npcs = this.add.group();

    this.anims.createFromAseprite('automaton');
    this.automatons = this.add.group();
    this.AutomatonMovement = new AutomatonMovement(this);

    this.MapGenerator.generateNPCs('npc', 'npcs');

    if (data.loadGame) {
      this.player.setAlpha(1);
      this.player.enabled = true;
    } else {
      // this.PlayerFadeIn = new PlayerFadeIn(this);
      // this.PlayerFadeIn.fadeIn();
      this.player.setAlpha(1); // for debugging (quicker start)
      this.player.enabled = true; // for debugging (quicker start)

      this.time.delayedCall(8000, () => {
        this.InfoBar.createInfoBar(['Use the "W", "A", "S", and "D" keys to move.', 'Use the "SPACE" key to interact with a person or object.']);
      });
      this.time.delayedCall(18000, () => {
        this.InfoBar.destroyInfoBar();
      });
      this.time.delayedCall(19000, () => {
        this.InfoBar.createInfoBar(['Press "C" to open the menu.', 'Press "ESC" to close the menu.']);
      });
      this.time.delayedCall(29000, () => {
        this.InfoBar.destroyInfoBar();
      });
    }

    this.keys.SPACE.on('down', () => {
      this.PlayerActions.dialog();
      this.PlayerActions.pickUp();
      this.PlayerActions.smelt();
    });

    // this.music = this.sound.add('music', { loop: true, volume: 0.5 });
    // this.time.delayedCall(7000, () => this.music.play(), [], this);


    // TESTING
    // this.FPS = new FPS(this, 'bottom-left');
    // this.Menu.createMenu(); // do auto-open menu
  }

  update() {
    this.MapGenerator.scrollGrass();

    if (this.player.enabled) {
      this.PlayerMovement.playerMove();
      if (this.input.keyboard.checkDown(this.keys.SPACE)) {
        this.PlayerActions.collect();
      }
    } else {
      this.PlayerMovement.playerIdle();
    }

    this.Place.update();

    this.TreeGrowth.update();

    this.Smelt.update();

    this.FPS.update();
  }
}
