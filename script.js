let camera; // Initialize the camera
const reader = new FileReader();
const TILE_SCALE = 1/Math.sqrt(3);
let images = {}; // Initialize sprite arrays
images.floors = [];
images.walls = [];
images.aura = [];
images.target = [];
images.player = {};
images.player.idle = [];
images.player.run = [];
let music = []; // Initialize music array
let level = new Level(1); // Initialize the first level
let gamemenu = new GameMenu(); // Initialize the game menu
let loadscreen = new LoadingScreen(37); // Initialize the loading screen with how many files need to be loaded
var tileTable;
function preload() {
  tileTable = loadTable('rooms/room-initial.csv', 'csv');
}
function loaded() {
  loadscreen.fileLoaded(); // Increment the loading screen
}
setInterval( function checkWindowFocus() {
  if (!document.hasFocus()) { // When the game isn't in focus,
    gamemenu.active = true; // Pause the game
  }
}, 200 );
function keyPressed() {
  if (keyCode == ESCAPE) {
    gamemenu.invertActive(); // Pause the game
  }
  if (keyCode == 81) { // Q
    // activate first ability
  }
  if (keyCode == 69) { // E
    // activate second ability
  }
  if (keyCode == 82) { // R
    // activate third ability
  }
  if (keyCode == SHIFT) {
    // activate dash
  }
}
function setup() {
  camera = new Camera(-windowWidth / 2,-windowHeight / 2);
  createCanvas(windowWidth,windowHeight);
  frameRate(60);
  angleMode(DEGREES);
  // Load Files
  music = [
    loadSound('music/a-robust-crew.mp3',loaded),
    loadSound('music/a-time-forgotten.mp3',loaded),
    loadSound('music/ale-and-anecdotes.mp3',loaded),
    loadSound('music/crystal-caverns.mp3',loaded),
    loadSound('music/i-am-not-what-i-thought.mp3',loaded),
    loadSound('music/dusty-memories.mp3',loaded),
    loadSound('music/eternal-sleep.mp3',loaded),
    loadSound('music/fireside-tales.mp3',loaded),
    loadSound('music/highland-castle.mp3',loaded),
    loadSound('music/i-was-always-right-here.mp3',loaded),
    loadSound('music/illusory-realm.mp3',loaded),
    loadSound('music/into-oblivion.mp3',loaded),
    loadSound('music/labyrinth-of-lost-dreams.mp3',loaded),
    loadSound('music/lake-of-destiny.mp3',loaded),
    loadSound('music/lord-mcdeath.mp3',loaded),
    loadSound('music/lurking-evil.mp3',loaded),
    loadSound('music/over-the-plains-of-snow.mp3',loaded),
    loadSound('music/the-phantoms-castle.mp3',loaded),
    loadSound('music/to-the-horizon.mp3',loaded)];
  images.walls = [
    loadImage('sprites/wallTile1.png',loaded),
    loadImage('sprites/wallTile2.png',loaded),
    loadImage('sprites/wallTile3.png',loaded),
    loadImage('sprites/wallTile4.png',loaded)];
  images.floors = [
    loadImage('sprites/floorTile1.png',loaded),
    loadImage('sprites/floorTile2.png',loaded),
    loadImage('sprites/floorTile3.png',loaded),
    loadImage('sprites/floorTile4.png',loaded)];
  images.aura = loadImage('sprites/playerAura.png',loaded);
  images.target = loadImage('sprites/target.png',loaded);
  for (let i = 0; i < 4; i++) {
    images.player.idle.push(loadImage('sprites/player/knight_idle_anim_f'+i+'.png', loaded));
    images.player.run.push(loadImage('sprites/player/knight_run_anim_f'+i+'.png', loaded));
  }
  // generate the room based on the tiletable
  for (var x = 0; x < tileTable.getRowCount(); x++){
    for (var y = 0; y < tileTable.getColumnCount(); y++) {
      if (tileTable.getString(x,y) == "w") {
        level.addTile(new CollisionTile(images.walls[1],images.floors[0]),x,y);
      } else { // eventually, we need to add individual else statements for void tiles (v), trap tiles (t), and explosive tiles (e).
        level.addTile(new Tile(images.floors[1]),x,y);
      }
    }
  }
  level.finishSetup();
  level.player.groundImage = images.aura;
}
let place = 0;
function playPlaylist(playlist) {
  if (place == playlist.length) {
    place = 0; // loop the playlist
  }
  playlist[place].play();
  setTimeout( function playSong() {
    place++;
    playPlaylist(playlist)
  }, playlist[place].duration() * 1000);
}
let executed = false; // Ensure playPlaylist() can only be called once
function mouseClicked() {
  level.basicChemistry();
  if (loadscreen.loadsLeft == 0 && !executed) { // When loading screen is clicked after files have been loaded, load music and close loadingscreen
    executed = true;
    playPlaylist(music);
    loadscreen.continue = true;
  }
}
function mouseWheel(e) {
  if (!gamemenu.active) {
    if (e.delta < 0 && camera.worldScale < 2) {
      camera.worldScale *= 1.1;
      camera.x /= 1.1;
    } else if (e.delta > 0 && camera.worldScale > 0.3) {
      camera.worldScale /= 1.1;
      camera.x *= 1.1;
    }
  }
}
let loadTick = 0;
function draw() {
  if (loadscreen.continue == false) {
    loadscreen.draw();
  } else {
    level.basicChemistry();
    // Game is active
    background(0); // draws black background
    push();
    if (!gamemenu.active) {
      camera.moveTowards(level.player);
    }
    camera.adjust();
    noStroke();
    level.displayGround();
    level.displayUpper();
    level.displayRoof();
    if (!gamemenu.active) {
      level.updateTargetPosition();
      level.runEntityMovement();
      level.runPlayerMovement();
    }
    pop();
    gamemenu.display();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}