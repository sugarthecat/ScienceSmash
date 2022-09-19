class CollisionTile extends Tile{
    constructor(x,y,w,h,img){
        super(x,y,w,h,img)
    }
    collides(other){
        // 
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
}