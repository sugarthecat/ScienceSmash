class VoidTile extends Tile {
    constructor() {
        super(undefined)
    }
    drawGround() {
    }
    drawRight() {
    }
    drawLeft() {
    }
    collides(other) {
        return false;
    }
}