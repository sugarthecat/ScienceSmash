class Player{
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 30 // width, constant
        this.h = 50 // height, constant
        this.dirx = 0 //1, 0, or -1, representing direction x
        this.diry = 0//1,0, or -1, representing direction y
    }
    //Ensures that dirx and diry are 
    fixDirections(){
        //Checks if either activating key is down for directional movement
        let right = keyIsDown(RIGHT_ARROW) || keyIsDown(68) // D key
        let left = keyIsDown(LEFT_ARROW) || keyIsDown(65) // A key
        let up = keyIsDown(UP_ARROW) || keyIsDown(87) // W key
        let down = keyIsDown(DOWN_ARROW) || keyIsDown(83) // S key
        //If only one of the x directions, or only one of the y directions is down, direction is set as that.
        this.dirx = 0
        this.diry = 0
        if(right && !left){
            this.dirx = 1
            //if a right key is pressed, and a left key is not pressed, x direction is positive
        }else if(left && !right){
            this.dirx = -1
            //if a left key is pressed, and a right key is not pressed, x direction is negative
        }
        if(down && !up){
            this.diry = 1
            //if a down key is pressed, and a up key is not pressed, y direction is positive
        }else if(up && !down){
            this.diry = -1
            //if a up key is pressed, and a down key is not pressed, y direction is negative
        }
        
    }
    runMoveTick(){
        this.fixDirections()
        const moveSpeed = 5
        if(this.dirx != 0 && this.diry != 0){
            this.x += this.dirx * moveSpeed  / sqrt(2)
            this.y += this.diry * moveSpeed  / sqrt(2)
            // accounts for pythagorean theorem if multi-axis movement
        }else{
            this.x += this.dirx * moveSpeed
            this.y += this.diry * moveSpeed
        }
    }
    draw(){
        noStroke()
        fill(255,0,0)
        rect(this.x,this.y,this.w,this.h)
    }
}