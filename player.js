class Player{
    // Constructor.
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 80 // width (constant)
        this.h = 80 // height (constant)
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
            this.diry = -1
            // moving right and not left, convert to actual grid.
        }else if(left && !right){
            this.dirx = -1
            this.diry = 1
            // moving left and not right, convert to actual grid.
        }
        if(down && !up){
            this.diry += 1
            this.dirx += 1
            // moving down and not up, convert to actual grid.
        }else if(up && !down){
            this.diry += -1
            this.dirx += -1
            // moving up and not down, convert to actual grid.
        }
        
    }

    // Updates the character's x and y positions.
    runMoveTick(level){
        this.fixDirections()
        const moveSpeed = 8
        let oldX = this.x
        let oldY = this.y
        let pythDir =  sqrt(this.dirx * this.dirx + this.diry * this.diry) //Distance of dirx and diry applied to a grid 
        if(pythDir != 0){
            this.x += this.dirx * moveSpeed/pythDir
            this.y += this.diry * moveSpeed/pythDir
            // Accounts for distance via pythagorean theorem if there is movement.
        }
        if(this.collidesWithAnyObjects(level)){
            // decollide
            let newX = this.x;
            let newY = this.y;
            this.x = oldX
            this.y = oldY

            let increment = 2;
            for(let i = 0; i<6; i++){
                // increments closer, seperated X and Y in smaller and smaller measurements
                this.x += (newX-oldX)/increment
                if(this.collidesWithAnyObjects(level)){
                    this.x -=(newX-oldX)/increment
                }
                this.y += (newY-oldY)/increment
                if(this.collidesWithAnyObjects(level)){
                    this.y -=(newY-oldY)/increment
                }
                increment*=2
            }
        }
    }
    collidesWithAnyObjects(level){
        let tileArray = level.getTiles()
        for(let i = 0; i<tileArray.length; i++){
            //check collision
            if(tileArray[i].collides(this)){
                return true
            }
        }
        return false;
    }
    // Positions the character on the screen.
    drawGround(){
        noStroke()
        fill(255,0,0)
        rect(this.x,this.y,this.w,this.h)
    }
    draw(){
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x,this.y)
        dispDir -= 45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist - this.w/2
        let disy = cos(dispDir)*dispDist 
        fill(255,200,100)
        rect(disx,disy,this.w,this.h)
    }
}