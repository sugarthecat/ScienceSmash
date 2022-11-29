class Room {
    constructor(typeInt) {
        this.tileTable = new p5.Table([]);
        this.type = typeInt;
    }
    getArray() {
        switch (this.type) {
            case 0: this.tileTable = assets.rooms.initial[Math.floor(Math.random() * assets.rooms.initial.length)];
            case 1: this.tileTable = assets.rooms.standard[Math.floor(Math.random() * assets.rooms.standard.length)];
            case 2: this.tileTable = assets.rooms.loot[Math.floor(Math.random() * assets.rooms.loot.length)];
            case 3: this.tileTable = assets.rooms.shop[Math.floor(Math.random() * assets.rooms.shop.length)];
            case 4: this.tileTable = assets.rooms.progression[Math.floor(Math.random() * assets.rooms.progression.length)];
            case 5: this.tileTable = assets.rooms.boss[Math.floor(Math.random() * assets.rooms.boss.length)];
        }
        return this.tileTable
    }
}