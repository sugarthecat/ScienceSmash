class Room {
    constructor(type) {
        this.tiles = [[]];
        if (type = 0) { // Initial
            this.type = "initial";
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