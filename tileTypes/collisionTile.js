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
        this.isCollisionTile = true;
    }
    //different collision function for collisiontile subclass than default tile superclass
    collides(other){
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
    displayGround(){
        fill(0)
        rect(this.x,this.y,this.w,this.h)
    }
}  