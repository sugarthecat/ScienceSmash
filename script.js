let player 
let camera
let loaded = false
let TO_LOAD = 6
const loadAmount = TO_LOAD
const TILE_SCALE = 1/Math.sqrt(3)
let images = {}
let level = new Level()
let song;
function fileLoaded(){
  TO_LOAD--;
  if(TO_LOAD == 0){
    loaded = true;
    song.play();
  }
}

// Set's up the tiles?
function setup(){
  player = new Player(500,500)
  camera = new Camera(player.x-windowWidth/2,player.y-windowHeight/2)
  song = loadSound('music/sneaky_snitch.mp3',fileLoaded)
  createCanvas(windowWidth,windowHeight)
  frameRate(60)
  angleMode(DEGREES)
  images.walls = [loadImage('sprites/wallTile1.png',fileLoaded),
    loadImage('sprites/wallTile2.png',fileLoaded)
    ]
  images.floors = [
    loadImage('sprites/floorTile1.png',fileLoaded),
    loadImage('sprites/floorTile2.png',fileLoaded)]
  images.aura = loadImage('sprites/playerAura.png',fileLoaded)
  //nanner garage
  for(let x = 0; x<22; x++){
    for(let y = 0; y<22; y++){
      if(x == 0 || y == 0 || ((y == 10 || y == 9 || y == 11) && !(x == 9 || x == 10 || x == 11)) || y == 21 || x == 21){
        level.addTile(new CollisionTile(images.walls[1]),x,y)
      }else{
        level.addTile(new Tile(images.floors[0]),x,y)
      }
    }
  }
  level.finishSetup()
}

let loadTick = 0;
// Draw's the tiles?
function draw(){
  if((!loaded) || loadTick < 1){
    //Slow down loading if going too fast
    let loadProgress = min((loadAmount-TO_LOAD)/loadAmount,loadTick)
    if(loadTick == loadProgress){
      loadTick+=0.015
    }
    //Not loaded, loading screen
    stroke(0)
    strokeWeight(10)
    // draw loading screen
    background(180,200,250)
    fill(0)
    circle(width/4,height/2,min(width/3,height-200))
    rect(20,height-80,width-40,50)
    fill(255)
    rect(20,height-80,(width-40)*loadProgress,50)
    fill(0,255,0)
    arc(width/4,height/2,min(width/3,height-200),min(width/3,height-200),0,360*loadProgress)
    
  }else{
    //Game is active
    background(0) // draws black background
    player.runMoveTick(level)
    camera.target(player)
    noStroke()

    push()
    // vertically scale and rotate tiles in order to make isometric viewpoint
    scale(1,TILE_SCALE)
    rotate(45)

    level.displayGround()
    player.drawGround()
    pop();

    level.displayUpper(player)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}