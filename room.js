class Room {
    constructor(typeInt) {
        this.tileTable;
        this.type = typeInt;
    }
    getArray() {
        if (this.type = 0) { // Initial
            this.tileTable = assets.rooms.initial[Math.floor(Math.random() * assets.rooms.initial.length)];
            return this.tileTable;
        }
        if (this.type = 1) { // Standard
            this.tileTable = assets.rooms.standard[Math.floor(Math.random() * assets.rooms.standard.length)];
            return this.tileTable;
        }
        if (this.type = 2) { // Loot
            this.tileTable = assets.rooms.loot[Math.floor(Math.random() * assets.rooms.loot.length)];
            return this.tileTable;
        }
        if (this.type = 3) { // Shop
            this.tileTable = assets.rooms.shop[Math.floor(Math.random() * assets.rooms.shop.length)];
            return this.tileTable;
        }
        if (this.type = 4) { // Progression
            this.tileTable = assets.rooms.progression[Math.floor(Math.random() * assets.rooms.progression.length)];
            return this.tileTable;
        }
        if (this.type = 5) { // Boss
            this.tileTable = assets.rooms.boss[Math.floor(Math.random() * assets.rooms.boss.length)];
            return this.tileTable;
        }
    }
}

/*
if (this.type = 0) { this.tileTable = assets.rooms.initial[Math.floor(Math.random() * assets.rooms.initial.length)]; }
if (this.type = 1) { this.tileTable = assets.rooms.standard[Math.floor(Math.random() * assets.rooms.standard.length)]; }
if (this.type = 2) { this.tileTable = assets.rooms.loot[Math.floor(Math.random() * assets.rooms.loot.length)]; }
if (this.type = 3) { this.tileTable = assets.rooms.shop[Math.floor(Math.random() * assets.rooms.shop.length)]; }
if (this.type = 4) { this.tileTable = assets.rooms.progression[Math.floor(Math.random() * assets.rooms.progression.length)]; }
if (this.type = 5) { this.tileTable = assets.rooms.boss[Math.floor(Math.random() * assets.rooms.boss.length)]; }
*/