class Assets {
    constructor() {
        this.finished = false;
        this.rooms = {};
        this.rooms.initial = [];
        this.rooms.standard = [];
        this.rooms.loot = [];
        this.rooms.shop = [];
        this.rooms.progression = [];
        this.rooms.boss = [];
        this.music = {};
        this.music.game = [];
        this.music.menu;
        this.sound = {};
        this.sound.load;
        this.sound.laugh = [];
        this.tutorialText;
        this.images = {};
        this.images.walls = [];
        this.images.floors = [];
        this.images.portal = [];
        this.images.aura;
        this.images.enemies = {};
        this.images.target;
        this.images.cone;
        this.images.book;
        this.images.player = {};
        this.images.player.idle;
        this.images.player.run = [];
        this.images.backgrounds = [];
        this.spritesheets = {};
        this.spritesheets.player = {};
    }
    loadFiles() {
        // load room csvs
        for (let i = 0; i < 2; i++) {
            this.rooms.initial.push(loadTable('assets/rooms/initial/i' + i + '.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 18; i++) {
            this.rooms.standard.push(loadTable('assets/rooms/standard/s' + i + '.csv', 'csv', 'noheader', loaded));
        }
        /*for (let i = 0; i < 2; i++) {
            this.rooms.loot.push(loadTable('assets/rooms/loot/l' + i + '.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 7; i++) {
            this.rooms.shop.push(loadTable('assets/rooms/shop/shop' + i + '.csv', 'csv', 'noheader', loaded));
        }*/
        for (let i = 0; i < 3; i++) {
            this.rooms.progression.push(loadTable('assets/rooms/progression/p' + i + '.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 2; i++) {
            this.rooms.boss.push(loadTable('assets/rooms/boss/b' + i + '.csv', 'csv', 'noheader', loaded));
        }
        this.rooms.tutorial = loadTable('assets/rooms/tutorial/tutorial.csv', 'csv', 'noheader', loaded)
        // load tutorial blurbs
        fetch("assets/tutorialblurbs.txt")
            .then(x => x.text())
            .then(x => this.tutorialText = x)
            .then(loaded());

        // load music and sounds
        for (let i = 0; i < 5; i++) {
            this.music.game.push(loadSound('assets/music/game' + i + '.mp3', loaded));
        }
        this.music.menu = loadSound('assets/music/menu.mp3', loaded);

        for (let i = 0; i < 5; i++) {
            this.sound.laugh.push(loadSound('assets/sound/laugh' + i + '.mp3', loaded));
        }
        this.sound.load = loadSound('assets/sound/load.mp3', loaded);

        // load sprites
        for (let i = 0; i < 4; i++) {
            this.images.walls.push(loadImage('assets/sprites/wallTile' + i + '.png', loaded));
        }
        for (let i = 0; i < 4; i++) {
            this.images.floors.push(loadImage('assets/sprites/floorTile' + i + '.png', loaded));
        }
        for (let i = 0; i < 7; i++) {
            this.images.portal.push(loadImage('assets/sprites/portalTile' + i + '.png', loaded));
        }
        this.images.aura = loadImage('assets/sprites/playerAura.png', loaded);
        this.images.target = loadImage('assets/sprites/target.png', loaded);
        this.images.enemies.frog = loadImage('assets/sprites/enemies/frog.png', loaded);
        this.images.cone = loadImage('assets/sprites/cone.png', loaded);
        this.images.pentagram = loadImage('assets/sprites/pentagram.png', loaded);
        this.images.laserbeam = loadImage('assets/sprites/laserbeam.png', loaded);
        this.images.laserbeambody = loadImage('assets/sprites/laserbeambody.png', loaded);
        this.images.book = loadImage('assets/sprites/book.png', loaded);
        this.images.player.idle = loadImage('assets/sprites/idle.png', loaded);
        for (let i = 0; i < 2; i++) {
            this.images.backgrounds.push(loadImage('assets/sprites/background' + i + '.png', loaded));
        }
        this.spritesheets.player.run = new SpriteSheet('assets/spritesheets/playerRun.png', loaded);
    }
}