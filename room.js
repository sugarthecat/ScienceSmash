class Room {
    constructor(typeInt) {
        this.type = typeInt;
        console.log
        this.tileTable = [[]];
        for (let i = 0; i < 25; i++) {
            this.tileTable.pushe
            for (let j = 0; j < 25; j++) {
                this.tileTable[i].push();
                switch (this.type) { 
                    case 0: 
                        this.tileTable[j][i] = assets.rooms.initial[Math.floor(Math.random() * assets.rooms.initial.length)].rows[i].arr[j];
                        break;
                    case 1: 
                        this.tileTable[j][i] = assets.rooms.standard[Math.floor(Math.random() * assets.rooms.standard.length)].rows[i].arr[j];
                        break;
                    case 2: 
                        this.tileTable[j][i] = assets.rooms.loot[Math.floor(Math.random() * assets.rooms.loot.length)].rows[i].arr[j];
                        break;
                    case 3: 
                        this.tileTable[j][i] = assets.rooms.shop[Math.floor(Math.random() * assets.rooms.shop.length)].rows[i].arr[j];
                        break;
                    case 4: 
                        this.tileTable[j][i] = assets.rooms.progression[Math.floor(Math.random() * assets.rooms.progression.length)].rows[i].arr[j];
                        break;
                    case 5: 
                        this.tileTable[j][i] = assets.rooms.boss[Math.floor(Math.random() * assets.rooms.boss.length)].rows[i].arr[j]; 
                        break;
                }
            }
        }
    }
}