class ExplosiveTile extends Tile {
    constructor(img) {
        super(img)
    }
    collides(other) {
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
        // Explosive Barrel inflicts burning on all entities within 3 tile diamater circular area around the center of the ExplosiveTile.
    }
}