let camera; // Initialize the camera
const reader = new FileReader();
const TILE_SCALE = 1 / Math.sqrt(3);
let assets = new Assets();
let level = new Level(1); // Initialize the first level
let gamemenu = new GameMenu(); // Initialize the game menu
let loadscreen = new LoadingScreen(43); // Initialize the loading screen with how many files need to be loaded
var tileTable;
let placeInPL = 0;

function preload() {
  tileTable = loadTable('rooms/initial/i0.csv', 'csv'); // Load the csv file containing the level information
}

function loaded() {
	loadscreen.fileLoaded(); // Increment the loading screen
}
setInterval(function checkWindowFocus() {
	if (!document.hasFocus()) { // When the game isn't in focus,
		gamemenu.active = true; // Pause the game
	}
}, 200);

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
		level.player.activateDash()
	}
}

function setup() {
	assets.loadFiles()
	camera = new Camera(-windowWidth / 2, -windowHeight / 2);
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	angleMode(DEGREES);
	level.generateTiles(tileTable);
	level.finishSetup();
	camera.setPositionAs(level.player)
}
function playPlaylist(playlist) {
	if (placeInPL == playlist.length) {
		placeInPL = 0; // loop the playlist
	}
	playlist[placeInPL].play();
	setTimeout(function playSong() {
		placeInPL++;
		playPlaylist(playlist)
	}, playlist[placeInPL].duration() * 1000);
}
let executed = false; // Ensure playPlaylist() can only be called once
function mouseClicked() {
	level.basicChemistry();
	if (loadscreen.loadsLeft == 0 && !executed) { // When loading screen is clicked after files have been loaded, load music and close loadingscreen
		executed = true;
		playPlaylist(assets.music);
		loadscreen.continue = true;
	}
}

function mouseWheel(e) {
	if (!gamemenu.active) {
		if (e.delta < 0) {
			camera.scaleUp(1.1, level.player);
		} else if (e.delta > 0) {
			camera.scaleDown(1.1, level.player)
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