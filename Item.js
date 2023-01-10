class Item {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
    }
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
    }
    draw() {
        
    }
}