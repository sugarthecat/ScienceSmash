let player 
let camera
let loaded = false
let TO_LOAD = 8
const loadAmount = TO_LOAD
let images = {}
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
}
function draw(){
  if(loaded){
    //not loading screen
    background(0)
    player.runMoveTick()
    camera.target(player)
    for(let i = 0; i<images.bananas.length; i++){
      image(images.bananas[i],i*100,0,100,100)
    }
    player.draw()
  }else{
    background(180,200,250)
    fill(0)
    rect(20,windowHeight-80,windowWidth-40,50)
    fill(255)
    rect(20,windowHeight-80,(windowWidth-40)*(loadAmount-TO_LOAD)/loadAmount,50)
    // draw loading screen
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}