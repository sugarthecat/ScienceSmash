class Player{
    // Constructor.
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 30 // width (constant)
        this.h = 50 // height (constant)
        this.dirx = 0 // 1, 0, or -1, representing direction x
        this.diry = 0// 1,0, or -1, representing direction y
    }

    // Ensures that dirx and diry are correct.
    fixDirections(){
        // Checks for movement key activations.
        let right = keyIsDown(RIGHT_ARROW) || keyIsDown(68) // D key
        let left = keyIsDown(LEFT_ARROW) || keyIsDown(65) // A key
        let up = keyIsDown(UP_ARROW) || keyIsDown(87) // W key
        let down = keyIsDown(DOWN_ARROW) || keyIsDown(83) // S key
        // Resolves key conflicts to ensure that if two opposite directions are attempted at the same time, nothing happens.
        this.dirx = 0
        this.diry = 0
        if(right && !left){
            this.dirx = 1
        }else if(left && !right){
            this.dirx = -1
        }
        if(down && !up){
            this.diry = 1
        }else if(up && !down){
            this.diry = -1
        }
        
    }

    // Updates the character's x and y positions.
    runMoveTick(){
        this.fixDirections()
        const moveSpeed = 8
        if(this.dirx != 0 && this.diry != 0){
            this.x += this.dirx * moveSpeed  / sqrt(2)
            this.y += this.diry * moveSpeed  / sqrt(2)
            // Accounts for pythagorean theorem if there is multi-axis movement.
        }else{
            this.x += this.dirx * moveSpeed
            this.y += this.diry * moveSpeed
        }
    }

    // Positions the character on the screen.
    draw(){
        noStroke()
        fill(255,0,0)
        rect(this.x,this.y,this.w,this.h)
    }
}