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
    displayRight(){
        push()
        rotate(60)
        scale(1,TILE_SCALE)
        rotate(-45)
        image(this.img,this.x-this.y-this.w,this.y,this.w,this.h)
        pop()
    }
    displayLeft(){
        push()
        rotate(-60)
        scale(1,TILE_SCALE)
        rotate(45)
        image(this.img,this.x-this.y,this.x,this.w,this.h)
        pop()
    }
}  