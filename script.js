let fade = 0
let fadeDir = -2
function setup(){
    createCanvas(windowWidth,windowHeight)
}
function draw(){
    background(fade)
    if(fade >= 255 || fade <= 0){
        fadeDir *= -1
    }
    fade += fadeDir
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}