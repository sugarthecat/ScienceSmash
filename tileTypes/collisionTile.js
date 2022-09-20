class CollisionTile extends Tile{
    constructor(x,y,w,h,img){
        super(x,y,w,h,img)
        this.hasUpper = true
        this.hasGround = false
        
    }
    collides(other){
        // 
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
    displayUpper(){
        let dispDir = atan2(this.x,this.y)
        dispDir -= 90
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist - this.w
        let disy = cos(dispDir)*dispDist 
        fill(255,200,100)
        rect(disx*2,disy,this.w,this.h)
    }
}   