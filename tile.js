class Tile {
    constructor(img) {
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.w = 100; // constant
        this.h = 100; // constant
        this.hasLeft = false; // true if wall to the bottom-left of it will display
        this.hasRight = false; // true if wall to the bottom-right of it will display
        this.hasGround = true; // true if bottom of tile will display
        this.hasRoof = false; // true if top of tile will display
        this.isCollisionTile = false;
    }
    displayGround() {
        image(this.img,this.x,this.y,this.w,this.h);
    }
    collides(other) {
        return false;
    }
    displayRight() {
        push();
        rotate(60);
        scale(1,TILE_SCALE);
        rotate(-45);
        image(this.img,this.x-this.y-this.w,this.y,this.w,this.h);
        pop();
    }
    displayLeft() {
        push();
        rotate(-60);
        scale(1,TILE_SCALE);
        rotate(45);
        image(this.img,this.x-this.y,this.x,this.w,this.h);
        pop();
    }
}