let camera;
const TILE_SCALE = 1/Math.sqrt(3);
let loadscreen = new LoadingScreen(18)
let images = {};
let level = new Level();
let paused = false
function fileLoaded(){
  loadscreen.itemLoaded()
}
setInterval( function checkWindowFocus() {
  if (!window.hasFocus && !paused) { // When the window isn't in focus, pause the game
    // Throw pause function
  }else if (paused && window.hasFocus){
    //a
  }
}, 200 );

function setup(){
  level.player = new Player(500,500)
  camera = new Camera(500-windowWidth/2,500-windowHeight/2)
  createCanvas(windowWidth,windowHeight)
  frameRate(60)
  angleMode(DEGREES)
  images.walls = [
    loadImage('sprites/wallTile1.png',fileLoaded),
    loadImage('sprites/wallTile2.png',fileLoaded),
    loadImage('sprites/wallTile3.png',fileLoaded),
    loadImage('sprites/wallTile4.png',fileLoaded),
    ]
  images.floors = [
    loadImage('sprites/floorTile1.png',fileLoaded),
    loadImage('sprites/floorTile2.png',fileLoaded),
    loadImage('sprites/floorTile3.png',fileLoaded),
    loadImage('sprites/floorTile4.png',fileLoaded),
  ]
  images.aura = loadImage('sprites/playerAura.png',fileLoaded)
  images.target = loadImage('sprites/target.png',fileLoaded)
  images.player = {}
  images.player.idle = []
  images.player.run = []
  for (let i = 0; i<4; i++) {
    images.player.idle.push(loadImage('sprites/player/knight_idle_anim_f'+i+'.png', fileLoaded))
    images.player.run.push(loadImage('sprites/player/knight_run_anim_f'+i+'.png', fileLoaded))
  }
  //nanner garage
  for (let x = 0; x<32; x++) {
    for (let y = 0; y<22; y++) {
      if (x == 0 || y == 0 || ((y == 10 || y == 9 || y == 11) && !(x == 9 || x == 10 || x == 11)) || y == 21 || x == 21) {
        level.addTile(new CollisionTile(images.walls[3]),x,y)
      }else{
        level.addTile(new Tile(images.floors[3]),x,y)
      }
    }
  }
  level.finishSetup()
  level.player.groundImage = images.aura
}

function mouseClicked(){
  level.fireAbility()
}
function mouseWheel(e){
  if(e.delta < 0 && camera.worldScale < 2){
    camera.worldScale *=1.1
    camera.x/=1.1
    camera.y/=1.1
  }else if(e.delta > 0 && camera.worldScale > 0.3){
    camera.worldScale/=1.1
    camera.x*=1.1
    camera.y*=1.1
  }
}
let loadTick = 0;
function draw(){
  if(!loadscreen.loaded()){
    loadscreen.draw()
  }else{
    level.fireAbility()
    // Game is active
    background(0) // draws black background
    level.runPlayerMovement()
    push()
    camera.target(level.player)
    noStroke()

    push()
    // Vertically scale and rotate tiles in order to make isometric viewpoint
    scale(1,TILE_SCALE)
    rotate(45)

    level.displayGround()
    pop();

    level.displayUpper()
    level.runEntityMovement()
    pop()
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}