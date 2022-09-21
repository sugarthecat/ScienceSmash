let player 
let camera
let loaded = false
let TO_LOAD = 2
const loadAmount = TO_LOAD
const TILE_SCALE = 0.5
let images = {}
let level = new Level()
function fileLoaded(){
  TO_LOAD--;
  if(TO_LOAD == 0){
    loaded = true;
  }
}

// Set's up the tiles?
function setup(){
  player = new Player(500,500)
  camera = new Camera(player.x-windowWidth/2,player.y-windowHeight/2)
  createCanvas(windowWidth,windowHeight)
  frameRate(60)
  angleMode(DEGREES)
  images.bananas = [loadImage('placeholders/test1.jpg',fileLoaded),
  loadImage('sprites/floorTile.png',fileLoaded)
]
  //nanner garage
  for(let x = 0; x<22; x++){
    for(let y = 0; y<22; y++){
      if(Math.random()<0.3 && (x!= floor(player.x/100) || y != floor(player.x/100))){
        level.addTile(new CollisionTile(x*100,y*100,100,100,images.bananas[0]),x,y)
      }else{
        level.addTile(new Tile(x*100,y*100,100,100,images.bananas[1]),x,y)
      }
    }
  }
  level.finishSetup()
}

// Draw's the tiles?
function draw(){
  if(loaded){
    //not loading screen
    background(0)
    player.runMoveTick(level)
    camera.target(player)
    noStroke()

    push()
    scale(1,TILE_SCALE)
    rotate(45)
    level.displayGround()
    player.drawGround()
    pop();

    level.displayUpper(player)


  }else{
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
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}