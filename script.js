let camera; // Initialize the camera
const reader = new FileReader();
const TILE_SCALE = 1 / Math.sqrt(3);
let assets = new Assets();
let level = new Level(1); // Initialize the first level
let gamemenu = new GameMenu(); // Initialize the game menu
let loadscreen = new LoadingScreen(33); // Initialize the loading screen with how many files need to be loaded
var tileTable;
let placeInPL = 0;
let executed = false; // Ensure playPlaylist() can only be called once
let loadTick = 0;
let tutorial;
function preload() {
  tileTable = loadTable('rooms/room-initial.csv', 'csv'); // Load the csv file containing the level information
}

function loaded() {
	loadscreen.fileLoaded(); // Increment the loading screen
}
setInterval(function checkWindowFocus() {
	if (!document.hasFocus()) { // When the game isn't in focus,
		//gamemenu.active = true; // Pause the game
	}
}, 200);

function keyPressed() {
	if(loadscreen.continue){
		if(!gamemenu.active && !tutorial.isComplete()){
			tutorial.takeInput(keyCode)
		}
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
}

function setup() {
	assets.loadFiles()
	camera = new Camera(-windowWidth / 2, -windowHeight / 2);
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	angleMode(DEGREES);
	// generate the room based on the tiletable
	for (var x = 0; x < tileTable.getRowCount(); x++) {
		for (var y = 0; y < tileTable.getColumnCount(); y++) {
			if (tileTable.getString(x, y) == "w") { // wall
				level.addTile(new CollisionTile(assets.images.walls[0], assets.images.walls[0]), x, y);
			} else if (tileTable.getString(x, y) == "g") { // ground
				level.addTile(new Tile(assets.images.floors[0]), x, y);
			} else if (tileTable.getString(x, y) == "v") { // void
				level.addTile(new VoidTile(assets.images.void[0]), x, y);
			} else if (tileTable.getString(x, y) == "t") { // trap
				// add trap tile
			} else if (tileTable.getString(x, y) == "e") { // explosive
				// add explosive tile
			}
		}
	}
	level.finishSetup();
	level.player.groundImage = assets.images.aura;
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
function mouseClicked() {
	level.basicChemistry();
	if (loadscreen.loadsLeft == 0 && !executed) { // When loading screen is clicked after files have been loaded, load music and close loadingscreen
		executed = true;
		playPlaylist(assets.music);
		loadscreen.continue = true;
		tutorial = new Tutorial(assets.tutorialText)
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
			if(!tutorial.isComplete()){
				tutorial.advanceText()
			}
		}
		pop();
		if(!tutorial.isComplete()){
			tutorial.display();
			//test level for completed tutorial condition
			tutorial.testLevel();
		}
		gamemenu.display();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}