let camera = new Camera(); // Initialize the camera
const TILE_SCALE = 1 / Math.sqrt(3);
let assets = new Assets(); // Initialize assets class
let level = new Level(); // Initialize the level class
let gamemenu = new GameMenu(); // Initialize the game menu
let loadscreen = new LoadingScreen(47); // Initialize the loading screen with how many files need to be loaded

let placeInPL = 0;
var tileTable;
let executed = false; // Ensure playPlaylist() can only be called once
let loadTick = 0;
let tutorial;

setInterval(function checkWindowFocus() {
	if (!document.hasFocus()) { // When the game isn't in focus,
		gamemenu.active = false; // Pause the game
	}
}, 200);

function loaded() {
	loadscreen.loadsLeft--; // Increment the loading screen
	if (loadscreen.loadsLeft == 0) {
		level.generateRooms();
		level.removeFalseWalls();
		camera.setPositionAs(level.player);
	}
}

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
	level.lvl = 1; // needs to start at 1 and be incremented when level increases
	camera.x = -windowWidth / 2;
    camera.y = -windowHeight / 2;
	assets.loadFiles();
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	angleMode(DEGREES);
	// TODO: x and y starting positions need to be adjusted to the center of the Initial room of the level.
	level.player.x = 500;
	level.player.y = 500;
}
function playPlaylist(playlist) {
	if (placeInPL == playlist.length) {
		placeInPL = 0; // loop the playlist
	}
	playlist[placeInPL].play();
	setTimeout(function playSong() {
		placeInPL++;
		playPlaylist(playlist);
	}, playlist[placeInPL].duration() * 1000);
}
function mouseClicked() {
	if (loadscreen.loadsLeft == 0){
		if(!executed) { // When loading screen is clicked after files have been loaded, load music and close loadingscreen
			executed = true;
			playPlaylist(assets.music);
			loadscreen.continue = true;
			tutorial = new Tutorial(assets.tutorialText);
		}else{
			level.activateBasicAttack();
		}
	}
}

function mouseWheel(e) {
	if (!gamemenu.active) {
		if (e.delta < 0) {
			camera.scaleUp(1.1, level.player);
		} else if (e.delta > 0) {
			camera.scaleDown(1.1, level.player);
		}
	}
}


function draw() {
	if (!executed) {
		loadscreen.draw();
	} else {
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
			if (!tutorial.isComplete()) {
				tutorial.advanceText();
			}
		}
		pop();
		if (!tutorial.isComplete()) {
			tutorial.display();
			tutorial.testLevel(); //test level for completed tutorial condition
		}
		gamemenu.display();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}