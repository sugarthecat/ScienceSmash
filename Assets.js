class Assets {
    constructor(){
        this.rooms = {};
        this.rooms.initial = [];
        this.rooms.standard = [];
        this.rooms.loot = [];
        this.rooms.shop = [];
        this.rooms.progression = [];
        this.rooms.boss = [];
        this.music = [];
        this.images = {};
        this.images.walls = [];
        this.images.floors = [];
        this.images.aura;
        this.images.target;
        this.images.player = {};
        this.images.player.idle;
        this.images.player.run = [];
    }
    loadFiles(){
        for (let i = 0; i < 2; i++) { // needs to be equal to the amount of room files in the initial room directory
            this.rooms.initial.push(loadTable('rooms/initial/i'+i+'.csv', 'csv', 'noheader', loaded))
        }
        for (let i = 0; i < 8; i++) { // needs to be equal to the amount of room files in the standard room directory
            this.rooms.standard.push(loadTable('rooms/standard/s'+i+'.csv', 'csv', 'noheader', loaded))
        }
        for (let i = 0; i < 2; i++) { // needs to be equal to the amount of room files in the loot room directory
            this.rooms.loot.push(loadTable('rooms/loot/l'+i+'.csv', 'csv', 'noheader', loaded))
        }
        for (let i = 0; i < 0; i++) { // needs to be equal to the amount of room files in the shop room directory
            this.rooms.shop.push(loadTable('rooms/shop/sh'+i+'.csv', 'csv', 'noheader', loaded))
        }
        for (let i = 0; i < 2; i++) { // needs to be equal to the amount of room files in the progression room directory
            this.rooms.progression.push(loadTable('rooms/progression/p'+i+'.csv', 'csv', 'noheader', loaded))
        }
        for (let i = 0; i < 0; i++) { // needs to be equal to the amount of room files in the boss room directory
            this.rooms.boss.push(loadTable('rooms/boss/b'+i+'.csv', 'csv', 'noheader', loaded))
        }
        this.music = [
            loadSound('music/a-robust-crew.mp3', loaded),
            loadSound('music/a-time-forgotten.mp3', loaded),
            loadSound('music/ale-and-anecdotes.mp3', loaded),
            loadSound('music/crystal-caverns.mp3', loaded),
            loadSound('music/i-am-not-what-i-thought.mp3', loaded),
            loadSound('music/dusty-memories.mp3', loaded),
            loadSound('music/eternal-sleep.mp3', loaded),
            loadSound('music/fireside-tales.mp3', loaded),
            loadSound('music/highland-castle.mp3', loaded),
            loadSound('music/i-was-always-right-here.mp3', loaded),
            loadSound('music/illusory-realm.mp3', loaded),
            loadSound('music/into-oblivion.mp3', loaded),
            loadSound('music/labyrinth-of-lost-dreams.mp3', loaded),
            loadSound('music/lake-of-destiny.mp3', loaded),
            loadSound('music/lord-mcdeath.mp3', loaded),
            loadSound('music/lurking-evil.mp3', loaded),
            loadSound('music/over-the-plains-of-snow.mp3', loaded),
            loadSound('music/the-phantoms-castle.mp3', loaded),
            loadSound('music/to-the-horizon.mp3', loaded)];
        this.images.walls = [
            loadImage('sprites/wallTile1.png', loaded),
            loadImage('sprites/wallTile2.png', loaded)];
        this.images.floors = [
            loadImage('sprites/floorTile1.png', loaded),
            loadImage('sprites/floorTile2.png', loaded)];
        this.images.void = [
            loadImage('sprites/voidTile.png', loaded)];
        this.images.aura = loadImage('sprites/playerAura.png', loaded);
        this.images.target = loadImage('sprites/target.png', loaded);
        this.images.player.idle = [loadImage('sprites/idle.png', loaded)];
        this.images.player.run = [
            loadImage('sprites/run1.png', loaded),
            loadImage('sprites/run2.png', loaded)];
    }
}