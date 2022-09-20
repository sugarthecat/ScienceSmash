let player 
let camera
let loaded = false
let TO_LOAD = 8
const loadAmount = TO_LOAD
let images = {}
let level = new Level()
function fileLoaded(){
  TO_LOAD--;
  if(TO_LOAD == 0){
    loaded = true;
  }
}
function setup(){
  player = new Player(0,0)
  camera = new Camera(player.x-windowWidth/2,player.y-windowHeight/2)
  createCanvas(windowWidth,windowHeight)
  frameRate(60)
  angleMode(DEGREES)
  images.bananas = []
  for(let i = 1; i<9; i++){
    images.bananas.push(
      loadImage('placeholders/test'+i+'.jpg',fileLoaded))
  }
  //nanner garage
  for(let x = -5; x<6; x++){
    for(let y = -5; y<5; y++){
      if(x == -5 || x == 5 || y == -5 || y == 5){
        level.addTile(new CollisionTile(x*100,y*100,100,100,images.bananas[0]))
      }else{
        level.addTile(new Tile(x*100,y*100,100,100,images.bananas[1]))
      }
    }
  }
}
function draw(){
  if(loaded){
    //not loading screen
    background(0)
    player.runMoveTick(level)
    camera.target(player)
    scale(1,0.8)
    rotate(45)
    for(let i = 0; i<images.bananas.length; i++){
      //image(images.bananas[i],i*100,0,100,100)
    }
    level.displayGround()
    player.draw()
    
    
  }else{
    // draw loading screen
    background(180,200,250)
    fill(0)
    rect(20,windowHeight-80,windowWidth-40,50)
    fill(255)
    rect(20,windowHeight-80,(windowWidth-40)*(loadAmount-TO_LOAD)/loadAmount,50)
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}