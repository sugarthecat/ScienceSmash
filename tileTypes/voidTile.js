class VoidTile extends Tile {
    constructor() {
        super(undefined)
    }
    displayGround() {
    }
    collides(other) {
        return false;
    }
    displayRight() {
    }
    displayLeft() {
    }
}