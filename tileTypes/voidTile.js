class VoidTile extends Tile {
    constructor() {
        super(undefined)
    }
    displayGround() {
    }
    displayRight() {
    }
    displayLeft() {
    }
    collides(other) {
        return false;
    }
}