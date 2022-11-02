class Room {
    constructor(type) {
        this.tiles = [[]];
        if (type = 0) { // Initial
            this.type = "initial";
            for (let x = 0; x < 26; x++) {
                for (let y = 0; y < 32; y++) {
                    if (x == 0 || y == 0 || ((y == 10 || y == 9 || y == 11) && !(x == 9 || x == 10 || x == 11)) || y == 31 || x == 31) {
                        level.addTile(new CollisionTile(images.walls[1],images.floors[0]),x,y);
                    } else {
                        level.addTile(new Tile(images.floors[1]),x,y);
                    }
                }
            }
        }
        if (type = 1) { // Standard
            this.type = "standard";
        }
        if (type = 2) { // Loot
            this.type = "loot";
        }
        if (type = 3) { // Shop
            this.type = "shop";
        }
        if (type = 4) { // Progression
            this.type = "progression";
        }
        if (type = 5) { // Boss
            this.type = "boss";
        }
    }
    getType() {
        return this.type;
    }
}