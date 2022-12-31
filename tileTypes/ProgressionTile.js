class ProgressionTile extends Tile {
    constructor(img) {
        super(img)
    }
    collides() {
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
    }
}