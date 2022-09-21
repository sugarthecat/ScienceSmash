class CollisionTile extends Tile{
    constructor(x,y,w,h,img){
        super(x,y,w,h,img)
        this.hasLeft = true
        this.hasRight = true
        this.hasGround = false
        
    }
    collides(other){
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
    displayLeft(){
        let dispDir = atan2(this.x,this.y)
        dispDir += -45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist
        let disy = cos(dispDir)*dispDist * TILE_SCALE
        dispDir = atan2(disx,disy)
        dispDir += -45
        dispDist = dist(0,0,disx,disy)
        disx = sin(dispDir)*dispDist 
        disy = cos(dispDir)*dispDist 
        disx /= 0.6
        dispDir = atan2(disx,disy)
        dispDir += 60
        dispDist = dist(0,0,disx,disy)
        disx = sin(dispDir)*dispDist - this.w 
        disy = cos(dispDir)*dispDist
        image(images.bananas[0],disx+this.w*0.1,disy,this.w*0.9,this.h)
    }
    displayRight(){
        let dispDir = atan2(this.x,this.y)
        dispDir += -45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist
        let disy = cos(dispDir)*dispDist * TILE_SCALE
        dispDir = atan2(disx,disy)
        dispDir += -45
        dispDist = dist(0,0,disx,disy)
        disx = sin(dispDir)*dispDist 
        disy = cos(dispDir)*dispDist 
        disy /= 0.6
        dispDir = atan2(disx,disy)
        dispDir += 30
        dispDist = dist(0,0,disx,disy)
        disx = sin(dispDir)*dispDist 
        disy = cos(dispDir)*dispDist
        image(images.bananas[0],disx-this.w*0.05,disy,this.w*0.95,this.h)
    }
}   