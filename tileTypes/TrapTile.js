class TrapTile extends Tile {
    constructor(img) {
        super(img)
    }
    collides(other) {
        return (this.x +this.w > other.x && other.x + other.w > this.x && this.y +this.h > other.y && other.y + other.h > this.y);
        // The spikes on the ground deal 2 DMG to the entity that stands on the tile, and does 1 DMG every second after the initial collide until the entity gets off the tile.
    }
}