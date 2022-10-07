class Entity{
    // Constructor.
    constructor(){
        this.x = 0
        this.y = 0
        this.w = 0 // width (constant)
        this.h = 0 // height (constant)
        this.dirx = 0 // 1, 0, or -1, representing direction x
        this.diry = 0// 1,0, or -1, representing direction y
        this.dispw = 0 //display width
        this.disph = 0 //display height
        this.moveSpeed = 0
    }
    //Given the level object, returns true if this player is colliding with any objects.
    collidesWithAnyObjects(level){
        //check collision
        if(level.collides(this)){
            return true
        }
        return false;
    }
    //returns if it collides with another object
    collides(other){
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
    // Updates the entity's x and y positions.
    runMoveTick(level){
        this.fixDirections()
        let oldX = this.x
        let oldY = this.y
        let pythDir =  sqrt(this.dirx * this.dirx + this.diry * this.diry) //Distance of dirx and diry applied to a grid 
        if(pythDir != 0){
            this.x += this.dirx * this.moveSpeed/pythDir
            this.y += this.diry * this.moveSpeed/pythDir
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
    //draw ground segment of character
    drawGround(){
        noStroke()
        fill(50,200,100)
        if(this.groundImage){
            image(this.groundImage,this.x,this.y,this.w,this.h)
        }
    }
    //draw upright section of character
    draw(){
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x,this.y)
        dispDir -= 45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist - this.dispw/2
        let disy = TILE_SCALE*(cos(dispDir)*dispDist - this.disph)
        fill(50,100,50)
        rect(disx,disy,this.dispw,this.disph)
    }
}