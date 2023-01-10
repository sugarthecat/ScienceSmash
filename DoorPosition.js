class DoorPosition {
    constructor(x, y, w, h, p) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.position = p;
        this.activated = false;
        this.onDoor = false;
    }
    collides(other) {
        return ((this.x * 100 + this.w > other.x) && (other.x + other.w > this.x * 100) && (this.y * 100 + this.h > other.y) && (other.y + other.h > this.y * 100));
    }
}