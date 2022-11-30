class Level {
    constructor() {
        this.tiles = [[]];
        this.lvl; // integer representation of what level the player is on
        this.targetRotation = 0;
        this.player = new Player();
        this.entities = [];
        this.tileTable = new p5.Table([]);
    }
    generateRooms() {
        // layout of the level in regard to the rooms
        // First array = x-axis/horizontal position
        // Second array = y-axis/vertical position
        let layout = [[new Room(0)]];
        // positions in the layout array (to efficiently keep track of positions in the grid which have been filled with rooms)
        // First array = the x-axis/horizontal position in the layout array
        // Second array = the y-axis/vertical position in the layout array
        let LP = [[0],[0]];
        // an array of all the rooms to be generated in the layout
        let rooms = [];
        //let mainRooms = [1, 1, 1, 1, 1, 1, 1, 1, 2, 3]; (commented out until loot and shop rooms are implemented)// 80% chance for standard, 10% chance for loot, 10% chance for shop
        let mainRoomsTypes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        if (this.lvl == 0) { // lvl 0 is the tutorial
            for (let i = 1; i < 5; i++) {
                rooms.push(new Room(i)); // Push a standard, loot, shop, and progression room
            }
        } else {
            for (let i = 0; i < this.lvl; i++) { // For every level
                rooms.push(new Room(mainRoomsTypes[Math.floor(Math.random() * 10)])); // Randomly push one of the main room types
            }
            if (this.lvl % 10) { // If its a tenth level, push a boss room
                rooms.push(new Room(5));
            } else { // Otherwise, push a normal progression room
                rooms.push(new Room(4));
            }
        }
        for (let i = 0; i < rooms.length; i++) {
            let dir = Math.floor(Math.random() * 4); // 0N 1E 2S 3W
            let b = Math.floor(Math.random() * LP[0].length);
            let branchx = LP[0][b]; // A randomly selected already placed room's x axis in the layout array
            let branchy = LP[1][b]; // A randomly selected already placed room's y axis in the layout array
            switch(dir) {
                case 0: // North
                    if (branchy == 0) {
                        for (let j = 0; j < layout.length; j++) {
                            layout[j].unshift(undefined);
                        }
                        for (let j = 0; j < LP[0].length; j++) { LP[1][j]++; } // Update the branch's layout array position in the LP array 
                        branchy++;
                    }
                    console.log(layout[branchx][branchy-1]);
                    if (layout[branchx][branchy-1] === undefined) {
                        layout[branchx][branchy-1] = rooms[i];
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 1: // East
                    if (branchx+1 == layout.length) {
                        let arrayZero = [];
                        for (let j = 0; j < layout[0].length; j++) { arrayZero.push(undefined); } // Create an array of undefined
                        layout.push(arrayZero);
                    }
                    console.log(layout[branchx+1][branchy]);
                    if (layout[branchx+1][branchy] === undefined) {
                        layout[branchx+1][branchy] = rooms[i];
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 2: // South
                    if (branchy+1 == layout[0].length) {
                        for (let j = 0; j < layout.length; j++) { layout[j].push(undefined); }
                    }
                    console.log(layout[branchx][branchy+1]);
                    if (layout[branchx][branchy+1] === undefined) {
                        layout[branchx][branchy+1] = rooms[i];
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 3: // West
                    if (branchx == 0) {
                        let arrayZero = [];
                        for (let j = 0; j < layout[0].length; j++) { arrayZero.push(undefined); } // Create an array of undefined
                        layout.unshift(arrayZero);
                        for (let j = 0; j < LP[0].length; j++) { LP[0][j]++; }
                        branchx++;
                    }
                    console.log(layout[branchx-1][branchy]);
                    if (layout[branchx-1][branchy] === undefined) {
                        layout[branchx-1][branchy] = rooms[i];
                    } else {
                        i--;
                        continue;
                    }
                    break;
            }
        }
        console.log(1);
        for (let i = 0; i < layout[0].length; i++) { // position on the y axis of layout array
            for (let r = 0; r < 25; r++) { // position on the y axis of the csv array
                let row = [];
                for (let j = 0; j < layout.length; j++) { // position on the x axis of the layout array
                    for (let k = 0; k < 25; k++) { // position on the x axis of the csv array
                        if (layout[j][i] !== undefined) {
                            console.log(layout[j][i]);
                            row.push(layout[j][i].tileTable.rows[r].arr[c]);
                        } else {
                            row.push("v");
                        }
                    }
                }
                this.tileTable.addRow(row);
            }
        }
        console.log(2);
        this.generateTiles();
        console.log(3);
    }
    generateTiles() {
        for (var x = 0; x < this.tileTable[0].length; x++) {
            for (var y = 0; y < this.tileTable.length; y++) {
                switch(this.tileTable[x][y]) {
                    case "w": // Wall
                        this.addTile(new CollisionTile(assets.images.walls[0], assets.images.walls[0]), x, y); 
                        break;
                    case "g": // Ground 
                        this.addTile(new Tile(assets.images.floors[0]), x, y);
                        break;
                    case "v": // Void
                        this.addTile(new VoidTile(assets.images.void[0]), x, y); 
                        break;
                    case "t": 
                        this.addTile(new Tile(assets.images.floors[0]), x, y); // TODO: add trap tile
                        break;
                    case "e": 
                        this.addTile(new Tile(assets.images.floors[0]), x, y); // TODO: add explosive tile
                        break;
                    case "c": 
                        this.addTile(new Tile(assets.images.floors[0]), x, y); // TODO: add chest tile
                        break;
                }
            }
        }
    }
    // This function is used in entity navigation
    generateNavCollideArray() {
        this.navigationTiles = [];
        for (let x = 0; x < this.tiles.length; x++) {
            this.navigationTiles.push([]);
            for (let y = 0; y < this.tiles[x].length; y++) {
                this.navigationTiles[x].push([]);
            }
        }
        for (let i = 0; i < this.entities.length; i++) {
            for (let x = floor(this.entities[i].x / 100); x < (this.entities[i].x + this.entities[i].w) / 100; x++) {
                for (let y = floor(this.entities[i].y / 100); y < (this.entities[i].y + this.entities[i].h) / 100; y++) {
                    this.navigationTiles[x][y].push(this.entities[i]);
                }
            }
        }
    }
    sharedNavCollide(x,y,entity) {
        if (this.navigationTiles[x][y].length > 0) {
            return !(this.navigationTiles[x][y][0] == entity && this.navigationTiles[x][y].length == 1);
        }
        return false;
    }
    runPlayerMovement() {
        this.player.runMoveTick(this);
        this.player.fixDirections();
    }
    addTile(t,x,y) {
        let tile = t;
        tile.x = x * 100;
        tile.y = y * 100;
        while (x >= this.tiles.length) {
            this.tiles.push([]);
        }
        while (y >= this.tiles[x].length) {
            this.tiles[x].push(null);
        }
        this.tiles[x][y] = tile;
    }
    getTiles() {
        return this.tiles;
    }
    removeFalseWalls() {
        // Remove any walls that would be behind others
        for (let x = 0; x<this.tiles.length-1; x++) {
            for (let y = 0; y<this.tiles[x].length-1; y++) {
                if ( (this.tiles[x][y].hasLeft && this.tiles[x+1][y].hasLeft)) {
                    this.tiles[x][y].hasLeft = false;
                }
                if ( (this.tiles[x][y].hasRight && this.tiles[x][y+1].hasRight)) {
                    this.tiles[x][y].hasRight = false;
                }
            }
        }
        // generate the player's aura image
        this.player.groundImage = assets.images.aura;
    }
    displayGround() {
        push();
        // Vertically scale and rotate tiles in order to make isometric viewpoint
        scale(1,TILE_SCALE);
        rotate(45);
        // call function "displayGround" for all items in 2d array tiles where hasGround is true
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[x].length; y++) {
                if (this.tiles[x][y].hasGround) {
                    this.tiles[x][y].displayGround();
                }
            }
        }
        this.player.drawGround();
        this.displayTarget();
        fill(0);
        rect(-1000,-1000,1000,100000);
        rect(-1000,-1000,100000,1000);
        rect(this.tiles.length*100,0,1000,100000);
        rect(0,this.tiles[0].length*100,100000,1000);
        for (let i = 0; i< this.entities.length; i++) {
            this.entities[i].drawGround();
        }
        pop();
    }
    displayUpper() {
        let playerDrawn = false;
        let entityDrawn = [];
        for (let i = 0; i< this.entities.length; i++) {
            entityDrawn.push(false)
        }
        if ((0+0)*100> this.player.x+this.player.y) {
            this.player.draw();
        }
        // d = distance to the top of the tile
        // p = distance to the right of the tile
        for (let d = 0; d < this.tiles.length+this.tiles[0].length; d++) {
            for (let p = 0; p<=d; p++) {
                let x = d - p;
                let y = p;
                if (!playerDrawn && (x+y+1)*100 > this.player.x+this.player.w+this.player.y) {
                    this.player.draw();
                    playerDrawn = true;
                }
                for (let i = 0; i< this.entities.length; i++) {
                    if (!entityDrawn[i] && (x+y+1)*100 > this.entities[i].x+this.entities[i].w+this.entities[i].y) {
                        this.entities[i].draw();
                        entityDrawn[i] = true;
                    }
                }
                if ( x < this.tiles.length && y < this.tiles[x].length) {
                    if (this.tiles[x][y].hasLeft) {
                        push();
                        this.tiles[x][y].displayLeft()
                        pop();
                    }
                    if (this.tiles[x][y].hasRight) {
                        push();
                        this.tiles[x][y].displayRight();
                        pop();
                    }
                }
            }
        }
    }
    displayRoof() {
        push();
        scale(1,TILE_SCALE);
        rotate(45);
        for (let x = 0; x<this.tiles.length; x++) {
            for (let y = 0; y<this.tiles[x].length; y++) {
                if (this.tiles[x][y].isCollisionTile) {
                    this.tiles[x][y].displayGround();
                }
            }
        }
        pop()
    }
    runEntityMovement(){
        this.generateNavCollideArray()
        for(let i = 0; i<this.entities.length; i++){
            if(this.entities[i].isNavigationEntity && this.entities[i].destination === undefined){
                this.entities[i].navTowardsPosition(this,this.player)
            }
            this.entities[i].runMoveTick(this)
        }
    }
    // Returns whether an object collides with anything on the level, given it has an x, y, w, and h property
    collides(other,ignore="default"){
        //If improper object properties, pass an error.
        if(typeof other.x != "number" || typeof other.y != "number" || typeof other.w != "number" || typeof other.h != "number"){
            console.error("Other object inserted into collides function of level must have type number attributes for x, y, w, and h")
        }
        if(other.x < 0 || other.y < 0 || other.x+ other.w> this.tiles.length*100 || other.h+ other.y > this.tiles[0].length*100){
            return true
        }
        //If colliding with any tiles, return true
        for(let x = floor(other.x/100); x<=min(floor((other.x+other.w)/100),this.tiles.length-1); x++){
            for(let y = floor(other.y/100); y<=min(floor((other.y+other.h)/100),this.tiles[x].length-1); y++){
                if(this.tiles[x][y] && this.tiles[x][y].collides(other)){
                    return true;
                }
            }
        }
        //If colliding with any entities, return ture
        for(let i = 0; i<this.entities.length; i++){
            if(this.entities[i] != other && this.entities[i] != ignore && this.entities[i].collides(other)){
                return true;
            }
        }
        return false;
    }
    // Returns whether an object collides with the tiles on the level, given it has an x, y, w, and h property
    collidesWithTiles(other){
        if(typeof other.x != "number" || typeof other.y != "number" || typeof other.w != "number" || typeof other.h != "number"){
            console.error("Other object inserted into collides function of level must have type number attributes for x, y, w, and h")
        }
        if(other.x < 0 || other.y < 0 || other.x > this.tiles.length*100 || other.y > this.tiles[0].length*100){
            return true
        }
        for(let x = floor(other.x/100); x<=min(floor((other.x+other.w)/100),this.tiles.length-1); x++){
            for(let y = floor(other.y/100); y<=min(floor((other.y+other.h)/100),this.tiles[x].length-1); y++){
                if(this.tiles[x][y] && this.tiles[x][y].collides(other)){
                    return true;
                }
            }
        }
        return false;
    }
    getProjectedMouseXY(){
        let disx = (mouseX / camera.worldScale + camera.x)
        let disy = (mouseY / camera.worldScale + camera.y)
        disy /= TILE_SCALE
        let xydist = dist(disx,disy,0,0)
        let targetAngle = atan2(disx,disy) + 45
        disx = sin(targetAngle) * xydist
        disy = cos(targetAngle) * xydist
        let currentDist = min(dist(disx,disy,this.player.x,this.player.y),750)
        let currentAngle = atan2(disx-this.player.x,disy-this.player.y)

        disx = sin(currentAngle)*currentDist+this.player.x
        disy = cos(currentAngle)*currentDist+this.player.y
        return [disx,disy];
    }
    updateTargetPosition(){
        this.targetRotation += 1.5
        let [dx,dy] = this.getProjectedMouseXY();
        this.targetx = dx
        this.targety = dy
    }
    displayTarget(){
        let [disx,disy] = this.getProjectedMouseXY();
        push()
        translate (this.targetx,this.targety)
        rotate (this.targetRotation)
        image(assets.images.target,-100,-100,200,200)
        pop()
    }
    basicChemistry(){
        let [disx,disy] = this.getProjectedMouseXY();
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].collides({x:disx,y:disy,w:0,h:0})) {
                this.entities[i].takeDamage(1);
                if (this.entities[i].health <= 0) {
                    this.entities.splice(i,1);
                }
            }
        }
    }
}