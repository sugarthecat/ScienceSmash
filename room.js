class Room {
    constructor(typeInt) {
        this.tileTable;
        this.type = typeInt;
        this.tileTableLoaded = false;
    }
    getCSV() {
        if (this.type = 0) { // Initial
            let x = Math.floor(Math.random() * 1) // needs to be equal to the amount of room files in the initial room directory
            this.tileTable = loadTable('rooms/initial/i'+x, 'csv', 'noheader', loaded);
            while (this.tileTableLoaded == false) { console.log("waiting for tileTable to load"); } // prevent the caller from receiving an empty tileTable
            return this.tileTable;
        }
        if (this.type = 1) { // Standard
            let x = Math.floor(Math.random() * 8) // needs to be equal to the amount of room files in the standard room directory
            this.tileTable = loadTable('rooms/standard/s'+x, 'csv', 'noheader', loaded);
            while (this.tileTableLoaded == false) { console.log("waiting for tileTable to load"); } // prevent the caller from receiving an empty tileTable
            return this.tileTable;
        }
        if (this.type = 2) { // Loot
            let x = Math.floor(Math.random() * 1) // needs to be equal to the amount of room files in the loot room directory
            this.tileTable = loadTable('rooms/loot/l'+x, 'csv', 'noheader', loaded);
            while (this.tileTableLoaded == false) { console.log("waiting for tileTable to load"); } // prevent the caller from receiving an empty tileTable
            return this.tileTable;
        }
        if (this.type = 3) { // Shop
            let x = Math.floor(Math.random() * 1) // needs to be equal to the amount of room files in the shop room directory
            this.tileTable = loadTable('rooms/shop/sh'+x, 'csv', 'noheader', loaded);
            while (this.tileTableLoaded == false) { console.log("waiting for tileTable to load"); } // prevent the caller from receiving an empty tileTable
            return this.tileTable;
        }
        if (this.type = 4) { // Progression
            let x = Math.floor(Math.random() * 1) // needs to be equal to the amount of room files in the progression room directory
            this.tileTable = loadTable('rooms/progression/p'+x, 'csv', 'noheader', loaded);
            while (this.tileTableLoaded == false) { console.log("waiting for tileTable to load"); } // prevent the caller from receiving an empty tileTable
            return this.tileTable;
        }
        if (this.type = 5) { // Boss
            let x = Math.floor(Math.random() * 1) // needs to be equal to the amount of room files in the boss room directory
            this.tileTable = loadTable('rooms/boss/b'+x, 'csv', 'noheader', loaded);
            while (this.tileTableLoaded == false) { console.log("waiting for tileTable to load"); } // prevent the caller from receiving an empty tileTable
            return this.tileTable;
        }
    }
    loaded() {
        this.tileTableLoaded = true;
    }
}