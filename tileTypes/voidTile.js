class VoidTile extends Tile {
    constructor(img) {
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