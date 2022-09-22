let player 
let camera
let loaded = false
let TO_LOAD = 3
const loadAmount = TO_LOAD
const TILE_SCALE = 0.5
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
  images.bananas = [loadImage('placeholders/test1.jpg',fileLoaded),
    loadImage('sprites/floorTile2.png',fileLoaded)
    ]
  //nanner garage
  for(let x = 0; x<22; x++){
    for(let y = 0; y<22; y++){
      if(x == 0 || y == 0 || y == 10 || y == 9 || y == 11 || y == 21 || x == 21){
        level.addTile(new CollisionTile(images.bananas[1]),x,y)
      }else{
        level.addTile(new Tile(images.bananas[0]),x,y)
      }
    }
  }
  level.finishSetup()
}

// Draw's the tiles?
function draw(){
  if(!loaded){
    //Not loaded, loading screen
    stroke(0)
    strokeWeight(10)
    // draw loading screen
    background(180,200,250)
    fill(0)
    circle(width/4,height/2,min(width/3,height-200))
    rect(20,height-80,width-40,50)
    fill(255)
    rect(20,height-80,(width-40)*(loadAmount-TO_LOAD)/loadAmount,50)
    fill(0,255,0)
    arc(width/4,height/2,min(width/3,height-200),min(width/3,height-200),0,360*(loadAmount-TO_LOAD)/loadAmount)

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