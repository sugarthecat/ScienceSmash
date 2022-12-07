class Tile {
    constructor(img) {
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;
        this.img = img;
        this.hasUpper = false;
        this.hasGround = true;
        this.hasRight = false;
        this.hasLeft = false;
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