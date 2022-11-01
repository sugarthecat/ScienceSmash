let camera;
const TILE_SCALE = 1/Math.sqrt(3);
let loadscreen = new LoadingScreen(18)
let images = {};
let level = new Level(1);
let gamemenu = new GameMenu()
function fileLoaded(){
  loadscreen.itemLoaded()
}
setInterval( function checkWindowFocus() {
  if (!document.hasFocus()) { // When the window isn't in focus, pause the game
    // Throw pause function
    gamemenu.active = true;
  }
}, 200 );
function keyPressed(){
  if(key == 'Escape'){
    gamemenu.invertActive()
  }
}
function setup(){
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
    for (let y = 0; y<32; y++) {
      if (x == 0 || y == 0 || ((y == 10 || y == 9 || y == 11) && !(x == 9 || x == 10 || x == 11)) || y == 31 || x == 31) {
        level.addTile(new CollisionTile(images.walls[1],images.floors[0]),x,y)
      }else{
        level.addTile(new Tile(images.floors[1]),x,y)
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
    push()
    if(!gamemenu.active){
      camera.moveTowards(level.player)
    }
    camera.adjust()
    noStroke()

    level.displayGround()
    level.displayUpper()
    level.displayRoof()
    if(!gamemenu.active){
      level.runEntityMovement()
      level.runPlayerMovement()
    }
    pop()
    gamemenu.display()
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}