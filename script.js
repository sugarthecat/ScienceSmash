let camera = new Camera(); // Initialize the camera
const TILE_SCALE = 1 / Math.sqrt(3);
let assets = new Assets(); // Initialize assets class
let level = new Level(); // Initialize the level class
let gamemenu = new GameMenu(); // Initialize the game menu
let loadscreen = new LoadingScreen(43); // Initialize the loading screen with how many files need to be loaded

let placeInPL = 0;

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
	switch (keyCode) {
		case ESCAPE: // pause the game (esc)
			gamemenu.invertActive(); 
			break;
		case SHIFT: // activate dash (shift)
			level.player.activateDash(); 
			break;
		case 81: // activate first Ability (Q)
			break;
		case 69: // activate second Ability (E)
			break;
		case 82: // activate third Ability (R)
			break;
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
let executed = false; // Ensure playPlaylist() can only be called once
function mouseClicked() {
	level.basicChemistry();
	if (loadscreen.loadsLeft == 0 && !executed) { // When loading screen is clicked after files have been loaded, load music and close loadingscreen
		executed = true;
		playPlaylist(assets.music);
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
	if (!executed) {
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