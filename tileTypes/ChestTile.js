class ChestTile extends Tile {
    constructor(img) {
        super(img)
    }
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
        // Only if the collidee is a player; The chest opens, and some currency is transferred to the player's balance.
    }
}