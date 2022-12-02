class Room {
    constructor(typeInt) {
        this.type = typeInt;
        this.tileTable = new Array(25).fill(undefined).map(()=>new Array(25).fill(undefined));
        let chosenTable;
        switch (this.type) { 
            case 0: 
                chosenTable = assets.rooms.initial
                break;
            case 1: 
                chosenTable = assets.rooms.standard
             break;
            case 2: 
                chosenTable = assets.rooms.loot
                break;
            case 3: 
                chosenTable = assets.rooms.shop
                break;
            case 4: 
                chosenTable = assets.rooms.progression
                break;
            case 5: 
                chosenTable = assets.rooms.boss
                break;
        }
        this.chosenIndex = min(Math.floor(Math.random() * chosenTable.length),3)
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                this.tileTable[i][j] = chosenTable[this.chosenIndex].rows[i].arr[j]
            }
        }
    }
}