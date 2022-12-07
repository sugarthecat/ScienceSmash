class ExplosiveTile extends Tile {
    constructor(img) {
        super(img)
    }
    collides(other) {
        // Explosive Barrel inflicts burning on all entities within 3 tile diamater circular area around the center of the ExplosiveTile.
    }
}