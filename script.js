let player 
let camera
function setup(){
    player = new Player(windowWidth/2,windowHeight/2)
    camera = new Camera(windowWidth/2,windowHeight/2)
    createCanvas(windowWidth,windowHeight)
    frameRate(60)
}
function draw(){
    background(0)
    player.runMoveTick()
    camera.target(player)
    player.draw()
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}