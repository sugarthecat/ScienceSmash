class ChestTile extends Tile {
    constructor(img) {
        super(img)
    }
    collides() {
        // Only if the collidee is a player; The chest opens, and some currency is transferred to the player's balance.
    }
}