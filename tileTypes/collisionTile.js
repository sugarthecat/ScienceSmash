class CollisionTile extends Tile{
    constructor(img){
        super(img)
        this.x = 0
        this.y = 0
        this.w = 100
        this.h = 100
        this.hasLeft = true // true if wall to the bottom-left of it will display
        this.hasRight = true // true if wall to the bottom-right of it will display
        this.hasGround = false // true if bottom of tile will display
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