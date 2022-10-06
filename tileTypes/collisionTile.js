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
}  