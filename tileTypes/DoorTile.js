class DoorTile extends Tile {
    constructor(img,horizontalImg) {
        super(img);
        this.horizontalImg = horizontalImg;
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;
        this.hasLeft = false; // true if wall to the bottom-left of it will display
        this.hasRight = false; // true if wall to the bottom-right of it will display
        this.hasGround = true; // true if bottom of tile will display
        this.hasRoof = false; // true if top of tile will display
        this.isCollisionTile = false; // true if collision is on
    }
    //different collision function for collisiontile subclass than default tile superclass
    collides(other) {
        return ((this.x + this.w > other.x) && (other.x + other.w > this.x) && (this.y + this.h > other.y) && (other.y + other.h > this.y));
    }
    // Despite name, this method displays the roof
    displayGround() {
        fill(255,0,0);
        if (this.hasRoof) {
            image(this.horizontalImg,this.x-100,this.y-100,this.w,this.h);
        } else {
            image(this.horizontalImg,this.x,this.y,this.w,this.h);
        }
    }
    changeCollision() {
        this.isCollisionTile = !this.isCollisionTile;
        this.hasLeft = !this.hasLeft;
        this.hasRight = !this.hasRight;
        this.hasGround = !this.hasGround;
        this.hasRoof = !this.hasRoof;
    }
}