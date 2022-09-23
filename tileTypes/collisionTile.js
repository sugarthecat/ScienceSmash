class CollisionTile extends Tile{
    constructor(img){
        super(img)
        this.x = 0
        this.y = 0
        this.w = 100
        this.h = 100
        this.hasLeft = true
        this.hasRight = true
        this.hasGround = false
        
    }
    collides(other){
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
    displayLeft(){
        // Rotate position 45 degrees backwards
        let dispDir = atan2(this.x,this.y)
        dispDir += -45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist
        // Reverse the y-scaling
        let disy = cos(dispDir)*dispDist * TILE_SCALE
        // Rotate position 45 degrees backwards
        dispDir = atan2(disx,disy)
        dispDir += -45
        dispDist = dist(0,0,disx,disy)
        disx = sin(dispDir)*dispDist 
        disy = cos(dispDir)*dispDist 
        //  Reverse the x-scaling for the wall images
        disx /= 0.6
        // Invert the image rotation for walls
        dispDir = atan2(disx,disy)
        dispDir += 60
        dispDist = dist(0,0,disx,disy)
        //Shift the wall into position
        disx = sin(dispDir)*dispDist - this.w 
        disy = cos(dispDir)*dispDist
        image(images.bananas[0],disx+this.w*0.12,disy,this.w*0.88,this.h)
    }
    displayRight(){
        // Rotate position 45 degrees backwards
        let dispDir = atan2(this.x,this.y)
        dispDir += -45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist
        // Reverse the y-scaling
        let disy = cos(dispDir)*dispDist * TILE_SCALE
        // Rotate position 45 degrees backwards
        dispDir = atan2(disx,disy)
        dispDir += -45
        dispDist = dist(0,0,disx,disy)
        disx = sin(dispDir)*dispDist 
        disy = cos(dispDir)*dispDist 
        //  Reverse the x-scaling for the wall images
        disy /= 0.6
        // Invert the image rotation for walls
        dispDir = atan2(disx,disy)
        dispDir += 30
        dispDist = dist(0,0,disx,disy)
        //Shift the wall into position
        disx = sin(dispDir)*dispDist 
        disy = cos(dispDir)*dispDist
        image(images.bananas[0],disx,disy,this.w*0.88,this.h)
    }
}   