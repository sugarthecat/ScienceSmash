class Room {
    constructor(typeInt) {
        this.type = typeInt;
        this.tileTable = new Array(25).fill(undefined).map(()=>new Array(25).fill(undefined));
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                switch (this.type) { 
                    case 0: 
                        this.tileTable[i][j] = assets.rooms.initial[Math.floor(Math.random() * assets.rooms.initial.length)].rows[i].arr[j];
                        break;
                    case 1: 
                        this.tileTable[i][j] = assets.rooms.standard[Math.floor(Math.random() * assets.rooms.standard.length)].rows[i].arr[j];
                        break;
                    case 2: 
                        this.tileTable[i][j] = assets.rooms.loot[Math.floor(Math.random() * assets.rooms.loot.length)].rows[i].arr[j];
                        break;
                    case 3: 
                        this.tileTable[i][j] = assets.rooms.shop[Math.floor(Math.random() * assets.rooms.shop.length)].rows[i].arr[j];
                        break;
                    case 4: 
                        this.tileTable[i][j] = assets.rooms.progression[Math.floor(Math.random() * assets.rooms.progression.length)].rows[i].arr[j];
                        break;
                    case 5: 
                        this.tileTable[i][j] = assets.rooms.boss[Math.floor(Math.random() * assets.rooms.boss.length)].rows[i].arr[j]; 
                        break;
                }
            }
        }
    }
}