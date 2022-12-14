window.addEventListener("contextmenu", e => e.preventDefault());
let camera = new Camera(); // Initialize the camera
const TILE_SCALE = 1 / Math.sqrt(3); // Initialize tile scale
let assets = new Assets(); // Initialize assets class
let level = new Level(); // Initialize the level class
let gamemenu = new GameMenu(); // Initialize the game menu
let loadscreen = new LoadingScreen(67); // Initialize the loading screen with how many files need to be loaded
let placeInPL = 0; // Place in the music playlist
let gameStarted = false; // boolean of whether the player has clicked continue after the loading screen
let loadTick = 0; // Loadtick speed
let tutorial; // Initialize tutorial

setInterval(function checkWindowFocus() {
	if (!document.hasFocus()) { // When the game isn't in focus,
		gamemenu.active = false; // Pause the game
	}
}, 200);

function loaded() {
	loadscreen.loadsLeft--; // Increment the loading screen
	if (loadscreen.loadsLeft == 0) {
		level.loadTurorialRoom();
		level.removeFalseWalls();
		camera.setPositionAs(level.player);
	}
}

function keyPressed() {
	if (loadscreen.continue) {
		if (!gamemenu.active && !tutorial.isComplete()) { tutorial.takeInput(keyCode); }
		if (keyCode == ESCAPE) { gamemenu.invertActive(); } // Pause the game
		if (keyCode == SHIFT) { level.player.activateDash(); }
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
}

function playPlaylist(playlist) {
	if (placeInPL == playlist.length) {
		placeInPL = 0; // loop the playlist
	}
	playlist[placeInPL].play();
	setTimeout(function playSong() {
		placeInPL++;
		playPlaylist(playlist);
	}, (playlist[placeInPL].duration() * 1000) + 5000);
}

function mousePressed() {
	if (loadscreen.loadsLeft == 0) { // When loading screen is clicked after files have been loaded, load music and close loadingscreen
		checkMousePress();
		if (gameStarted) {
			if (mouseButton == LEFT) {
				level.activateBasicAttack();
				if (tutorial.phase == 8 && tutorial.textbox.isComplete()) {
					tutorial.advancePhase();
				}
			}
			if (mouseButton == RIGHT) {
				level.activateSpecialAttack();
				if (tutorial.phase == 11 && tutorial.textbox.isComplete()) {
					tutorial.advancePhase();
				}
			}
		} else {
			gameStarted = true;
			playPlaylist(assets.music.game);
			loadscreen.continue = true;
			tutorial = new Tutorial(assets.tutorialText);
		}
	}
}

function mouseWheel(e) {
	if (!gamemenu.active) {
		if (e.delta < 0) {
			camera.scaleUp(level.player);
		} else if (e.delta > 0) {
			camera.scaleDown(level.player);
		}
	}
}

function draw() {
	if (!gameStarted) {
		loadscreen.draw();
	} else {
		background(assets.images.backgrounds[Math.floor(Math.random() * assets.images.backgrounds.length)]); // draws black background
		push();
		if (!gamemenu.active) {
			camera.moveTowards(level.player);
			level.updateTargetPosition();
			level.runEntityMovement();
			level.runPlayerMovement();
			if (!tutorial.isComplete()) { tutorial.advanceText(); }
		}
		camera.adjust();
		noStroke();
		level.displayFloor();
		level.displayWalls();
		level.runDamage();
		level.areItemsColliding();
		level.testLevelCompletion();
		pop();
		if (!tutorial.isComplete()) {
			tutorial.display();
			tutorial.testLevel(); // test level for completed tutorial condition
		}
		level.displayWarning();
		gamemenu.display();
	}
}

function checkMousePress() {
	if (mouseIsPressed === true) {
		if (mouseButton === LEFT) {
			level.activateBasicAttack();
		}
		if (mouseButton === RIGHT) {
			level.activateSpecialAttack();
		}
		if (mouseButton === CENTER) {
			// switch between loaded special attacks
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}