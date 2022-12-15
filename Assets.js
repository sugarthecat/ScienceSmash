class Assets {
    constructor(){
        this.finished = false;
        this.rooms = {};
        this.rooms.initial = [];
        this.rooms.standard = [];
        this.rooms.loot = [];
        this.rooms.shop = [];
        this.rooms.progression = [];
        this.rooms.boss = [];
        this.music = [];
        this.tutorialText;
        this.images = {};
        this.images.walls = [];
        this.images.floors = [];
        this.images.doorTop;
        this.images.doorSide;
        this.images.portal = [];
        this.images.aura;
        this.images.target;
        this.images.player = {};
        this.images.player.idle;
        this.images.player.run = [];
        this.images.backgrounds = [];
    }
    loadFiles(){
        for (let i = 0; i < 2; i++) { // needs to be equal to the amount of room files in the initial room directory
            this.rooms.initial.push(loadTable('assets/rooms/initial/i'+i+'.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 18; i++) { // needs to be equal to the amount of room files in the standard room directory
            this.rooms.standard.push(loadTable('assets/rooms/standard/s'+i+'.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 2; i++) { // needs to be equal to the amount of room files in the loot room directory
            this.rooms.loot.push(loadTable('assets/rooms/loot/l'+i+'.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 7; i++) { // needs to be equal to the amount of room files in the shop room directory
            this.rooms.shop.push(loadTable('assets/rooms/shop/shop'+i+'.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 3; i++) { // needs to be equal to the amount of room files in the progression room directory
            this.rooms.progression.push(loadTable('assets/rooms/progression/p'+i+'.csv', 'csv', 'noheader', loaded));
        }
        for (let i = 0; i < 2; i++) { // needs to be equal to the amount of room files in the boss room directory
            this.rooms.boss.push(loadTable('assets/rooms/boss/b'+i+'.csv', 'csv', 'noheader', loaded));
        }
        
        fetch("assets/tutorialblurbs.txt")
        .then(x => x.text())
        .then(x => this.tutorialText = x)
        .then(loaded());
        
        this.music = [
            /*loadSound('assets/music/a-robust-crew.mp3', loaded),
            loadSound('assets/music/a-time-forgotten.mp3', loaded),
            loadSound('assets/music/ale-and-anecdotes.mp3', loaded),
            loadSound('assets/music/crystal-caverns.mp3', loaded),
            loadSound('assets/music/i-am-not-what-i-thought.mp3', loaded),
            loadSound('assets/music/dusty-memories.mp3', loaded),
            loadSound('assets/music/eternal-sleep.mp3', loaded),
            loadSound('assets/music/fireside-tales.mp3', loaded),
            loadSound('assets/music/highland-castle.mp3', loaded),
            loadSound('assets/music/i-was-always-right-here.mp3', loaded),
            loadSound('assets/music/illusory-realm.mp3', loaded),
            loadSound('assets/music/into-oblivion.mp3', loaded),
            loadSound('assets/music/labyrinth-of-lost-dreams.mp3', loaded),
            loadSound('assets/music/lake-of-destiny.mp3', loaded),
            loadSound('assets/music/lord-mcdeath.mp3', loaded),
            loadSound('assets/music/lurking-evil.mp3', loaded),*/
            loadSound('assets/music/over-the-plains-of-snow.mp3', loaded),
            loadSound('assets/music/the-phantoms-castle.mp3', loaded),
            loadSound('assets/music/to-the-horizon.mp3', loaded)];
        for (let i = 0; i < 4; i++) {
            this.images.walls.push(loadImage('assets/sprites/wallTile'+i+'.png', loaded));}
        for (let i = 0; i < 4; i++) {
            this.images.floors.push(loadImage('assets/sprites/floorTile'+i+'.png', loaded));}
        for (let i = 0; i < 7; i++) {
            this.images.portal.push(loadImage('assets/sprites/portalTile'+i+'.png', loaded));}
        this.images.aura = loadImage('assets/sprites/playerAura.png', loaded);
        this.images.target = loadImage('assets/sprites/target.png', loaded);
        this.images.player.idle = [loadImage('assets/sprites/idle.png', loaded)];
        for (let i = 0; i < 5; i++) {
            this.images.player.run.push(loadImage('assets/sprites/run'+i+'.png', loaded));}
        for (let i = 0; i < 2; i++) {
            this.images.backgrounds.push(loadImage('assets/sprites/background'+i+'.png', loaded));
        }
        this.images.doorTop = loadImage('assets/sprites/doorTop.png', loaded);
        this.images.doorSide = loadImage('assets/sprites/doorSide.png', loaded);
    }
}