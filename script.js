let player = new Player(0,0)

function setup(){
    createCanvas(windowWidth,windowHeight)
    frameRate(60)
}

function draw(){
    background(0)
    player.runMoveTick()
    player.draw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}