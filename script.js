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
  player = new Player(windowWidth/2,windowHeight/2)
  camera = new Camera(player.x-windowWidth/2,player.y-windowHeight/2)
  createCanvas(windowWidth,windowHeight)
  frameRate(60)
  images.bananas = []
  for(let i = 1; i<9; i++){
    images.bananas.push(
      loadImage('placeholders/test'+i+'.jpg',fileLoaded))
  }
  level.addTile(new CollisionTile(0,0,100,100,images.bananas[0]))
  level.addTile(new CollisionTile(200,0,100,100,images.bananas[0]))
  level.addTile(new CollisionTile(300,100,100,100,images.bananas[0]))
  level.addTile(new CollisionTile(500,200,100,100,images.bananas[0]))
  level.addTile(new CollisionTile(0,500,100,100,images.bananas[0]))
}
function draw(){
  if(loaded){
    //not loading screen
    background(0)
    player.runMoveTick(level)
    camera.target(player)
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