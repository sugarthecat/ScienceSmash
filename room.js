class Room {
    constructor(typeInt) {
        this.tiles = [[]];
        this.typeInt = typeInt
        this.type = "";
    }
    buildRoom() {
        let images = {};
        images.walls = assets.images.walls
        images.floors = assets.images.floors
        if (this.type = 0) { // Initial
            this.type = "initial";
            for (let x = 0; x < 25; x++) {
                for (let y = 0; y < 25; y++) {
                    if((x== 4 && !((y>=11 && y<=13) || y>=21 || y<=3)) 
                    || (x==20 && !((y>=11 && y<=13) || y>=21 || y<=3)) 
                    || (y== 4 && !((x>=11 && x<=13) || x>=21 || x<=3))
                    || (y==20 && !((x>=11 && x<=13) || x>=21 || x<=3)) 
                    || (x==10 && (y<=3 || y>=21))
                    || (x==14 && (y<=3 || y>=21))
                    || (y==10 && (x<=3 || x>=21))
                    || (y==14 && (x<=3 || x>=21))) {
                        this.tiles.push(new CollisionTile(images.walls[1],images.floors[0]),x,y);
                    } else {
                        this.tiles.push(new Tile(images.floors[1]),x,y);
                    }
                }
            }
        }
        if (this.typeInt = 1) { // Standard
            this.type = "standard";
        }
        if (this.typeInt = 2) { // Loot
            this.type = "loot";
        }
        if (this.typeInt = 3) { // Shop
            this.type = "shop";
        }
        if (this.typeInt = 4) { // Progression
            this.type = "progression";
        }
        if (this.typeInt = 5) { // Boss
            this.type = "boss";
        }
    }
}