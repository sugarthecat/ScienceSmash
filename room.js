class Room {
    constructor(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
}

// Room Types:
// standard
// initial
// loot
// shop
// progression
// boss
// empty (no room)