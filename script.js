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
  for(let x = -10; x<11; x++){
    for(let y = -10; y<11; y++){
      if((Math.random()>0.7) && (x!= 0 || y != 0)){
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
    level.displayGround()
    player.drawGround()
    rotate(-45)
    scale(1,1/0.8)
    player.draw()
    scale(1,1)
    rotate(-45)
    level.displayUpper()

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