class Level {
    constructor() {
        this.tiles = [[]];
        this.lvl; // integer representation of what level the player is on
        this.targetRotation = 0;
        this.spawn;
        this.player = new Player();
        this.entities = [];
        //this.roomTable = []; // TODO: construct table of rooms to add a layer of abstraction to certain methods
        this.doorPositions = []; 
    }
    incrementLvl() {
        this.lvl++;
    }
    generateRooms() {
        // layout of the level in regard to the rooms
        // First array = x-axis/horizontal position
        // Second array = y-axis/vertical position
        let layout = [[new Room(0)]];

        let tileTable = [];
        let LP = [[0,0]]; // an array of all the rooms' x and y positions in the layout
        let rooms = []; // an array of all the rooms to be generated in the layout (starts with initial room at 0,0)
        let mainRoomsTypes = [1, 1, 1, 1, 1, 1, 1, 1, 2, /*should be 3 when shops are introduced*/1]; // 80% chance for standard, 10% chance for loot, 10% chance for shop
        let amountOfRooms = (Math.ceil(this.lvl / 5) * 5) - (Math.floor(Math.random() * 5));
        for (let i = 0; i < amountOfRooms; i++) {
            rooms.push(new Room(mainRoomsTypes[Math.floor(Math.random() * 10)])); // Randomly push one of the main room types
        }
        if (this.lvl % 10 == 0) { // If its a tenth level, push a boss room
            rooms.push(new Room(5));
        } else { // Otherwise, push a normal progression room
            rooms.push(new Room(4));
        }
        for (let i = 0; i < rooms.length; i++) {
            let dir = Math.floor(Math.random() * 4); // 0N 1E 2S 3W
            let b = Math.floor(Math.random() * LP.length);
            let branchx = LP[b][0]; // A randomly selected already placed room's x axis in the layout array
            let branchy = LP[b][1]; // A randomly selected already placed room's y axis in the layout array
            switch(dir) {
                case 0: // North
                    if (branchy == 0) {
                        for (let j = 0; j < layout.length; j++) { layout[j].unshift(undefined); }
                        for (let j = 0; j < LP.length; j++) { LP[j][1]++; } // Update the branch's layout array position in the LP array 
                        branchy++;
                    }
                    if (layout[branchx][branchy-1] === undefined) {
                        layout[branchx][branchy-1] = rooms[i];
                        LP.push([branchx,branchy-1]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 1: // East
                    if (branchx+1 == layout.length) { layout.push(new Array(layout[0].length).fill(undefined)); }
                    if (layout[branchx+1][branchy] === undefined) {
                        layout[branchx+1][branchy] = rooms[i];
                        LP.push([branchx+1,branchy]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 2: // South
                    if (branchy+1 == layout[0].length) {
                        for (let j = 0; j < layout.length; j++) { layout[j].push(undefined); }
                    }
                    if (layout[branchx][branchy+1] === undefined) {
                        layout[branchx][branchy+1] = rooms[i];
                        LP.push([branchx,branchy+1]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 3: // West
                    if (branchx == 0) {
                        layout.unshift(new Array(layout[0].length).fill(undefined));
                        for (let j = 0; j < LP.length; j++) { LP[j][0]++; }
                        branchx++;
                    }
                    if (layout[branchx-1][branchy] === undefined) {
                        layout[branchx-1][branchy] = rooms[i];
                        LP.push([branchx-1,branchy]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
            }
        }
        // Close the holes in the level and add doors between the rooms
        for (let i = 0; i < layout.length; i++) { // position on the y axis of layout array
            for (let j = 0; j < layout[i].length; j++) { // position on the x axis of layout array
                if (layout[i][j] instanceof Room) {
                    if (i == 0 || !(layout[i-1][j] instanceof Room)) { // top
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[k][0] = "w"; } // seal north wall
                    } else if (layout[i-1][j] instanceof Room) {
                        if (layout[i][j].type != 0) { for (let k = 11; k < 14; k++) { layout[i][j].tileTable[k][0] = "d"; }
                        this.doorPositions.push(new DoorPosition((j*25)+11,(i*25),300,100,0)); }
                    }
                    if (j == layout[i].length-1 || !(layout[i][j+1] instanceof Room)) { // right
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[24][k] = "w"; } // seal east wall
                    } else if (layout[i][j+1] instanceof Room) {
                        if (layout[i][j].type != 0) { for (let k = 11; k < 14; k++) { layout[i][j].tileTable[24][k] = "d"; }
                        this.doorPositions.push(new DoorPosition((j*25)+24,(i*25)+11,100,300,1)); }
                    }
                    if (i == layout.length-1 || !(layout[i+1][j] instanceof Room)) { // bottom
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[k][24] = "w"; } // seal south wall
                    } else if (layout[i+1][j] instanceof Room) {
                        if (layout[i][j].type != 0) { for (let k = 11; k < 14; k++) { layout[i][j].tileTable[k][24] = "d"; }
                        this.doorPositions.push(new DoorPosition((j*25)+11,(i*25)+24,300,100,2)); }
                    }
                    if (j == 0 || !(layout[i][j-1] instanceof Room)) { // left
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[0][k] = "w"; } // seal west wall
                    } else if (layout[i][j-1] instanceof Room) {
                        if (layout[i][j].type != 0) { for (let k = 11; k < 14; k++) { layout[i][j].tileTable[0][k] = "d"; }
                        this.doorPositions.push(new DoorPosition((j*25),(i*25)+11,100,300,3)); }
                    }
                }
            }
        }
        // Build the tileTable
        for (let i = 0; i < layout[0].length; i++) { // position on the y axis of layout array
            for (let r = 0; r < 25; r++) { // position on the y axis of the csv array
                let row = [];
                for (let j = 0; j < layout.length; j++) { // position on the x axis of the layout array
                    for (let c = 0; c < 25; c++) { // position on the x axis of the csv array
                        if (layout[j][i] !== undefined) {
                            row.push(layout[j][i].tileTable[r][c]);
                        } else {
                            row.push("v");
                        }
                    }
                }
                tileTable.push(row);
            }
        }
        // Set the player's starting position to the middle of the initial room
        for (let x = 0; x<layout.length; x++) {
            for (let y = 0; y<layout[x].length; y++) {
                if (layout[x][y] !== undefined && layout[x][y].type == 0) {
                    this.spawn = [y*2500 + 1250,x*2500 + 1250];
                    this.player.setPosition(this.spawn[0],this.spawn[1]);
                }
            }
        }
        for (var x = 0; x < tileTable.length; x++) {
            for (var y = 0; y < tileTable[x].length; y++) {
                switch (tileTable[x][y]) {
                    case "w": // Wall
                        this.addTile(new CollisionTile(assets.images.walls[Math.floor(Math.random() * assets.images.walls.length)], assets.images.walls[Math.floor(Math.random() * assets.images.walls.length)]), x, y); 
                        break;
                    case "g": // Ground 
                        this.addTile(new Tile(assets.images.floors[Math.floor(Math.random() * assets.images.floors.length)]), x, y);
                        if(Math.random() < 0.01){
                        this.entities.push(new Enemy(x*100,y*100,1))
                        }
                        break;
                    case "v": // Void 
                        this.addTile(new VoidTile(), x, y);
                        break;
                    case "d": // Door
                        this.addTile(new DoorTile(assets.images.doorSide, assets.images.doorTop), x, y); 
                        break;
                    case "t": // Trap
                        this.addTile(new Tile(assets.images.floors[0]), x, y); // TODO: add trap tile
                        break;
                    case "e": // Explosive
                        this.addTile(new Tile(assets.images.floors[0]), x, y); // TODO: add explosive tile
                        break;
                    case "c": // Chest
                        this.addTile(new Tile(assets.images.floors[0]), x, y); // TODO: add chest tile
                        break;
                    case "p": // Portal
                        this.addTile(new ProgressionTile(assets.images.portal[Math.floor(Math.random() * assets.images.portal.length)]), x, y);
                        break;
                    /*case "s": // Shopkeeper
                        break;
                    case "b": // Buyable
                        break;*/
                    default:
                        this.addTile(new VoidTile(), x, y); 
                        break;
                }
            }
        }
    }
    getCollisionTileArray(){
        let outArray = []
        for (let i = 0; i < this.tiles.length; i++) {
            outArray.push([]);
            for (let j = 0; j < this.tiles[i].length; j++) {
                outArray[i].push(!(this.tiles[i][j].isCollisionTile));
            }
        }
        return outArray
    }
    // Check for necessary door collision changes
    checkDoors() {
        for (let i = 0; i < this.doorPositions.length; i++) {
            if ((this.doorPositions[i].activated == false) && (this.doorPositions[i].collides(this.player))) {
                this.doorPositions[i].onDoor = true;
            } else if (this.doorPositions[i].onDoor) {
                this.doorPositions[i].activated = true;
                this.doorPositions[i].onDoor = false;
                this.flipWalls(this.doorPositions[i].x,this.doorPositions[i].y,this.doorPositions[i].position);
            }
        }
    }
    // Flips the doors up or down
    flipWalls(x,y,p) { // p = position ( 0=N, 1=E, 2=S, 3=W )
        if (p == 0 || p == 2) { // North or South
            // This
            for (let i = 0; i < 3; i++) { this.tiles[x+i][y].changeCollision(); }
            // Opposite
            let a1 = 24;
            if (p == 2) { a1 = -24; }
            if (this.tiles[x][y+a1] instanceof DoorTile) {
                for (let i = 0; i < 3; i++) { this.tiles[x+i][y+a1].changeCollision(); }
            }
            // East and West
            let a2 = 11
            if (p == 2) { a2 = -13; }
            let a3 = 13
            for (let i = 0; i < 2; i++) {
                if (this.tiles[x+a3][y+a2] instanceof DoorTile) {
                    for (let j = 0; j < 3; j++) { this.tiles[x+a3][y+a2+j].changeCollision(); }
                }
                a3 = -11;
            }
        } else if (p == 1 || p == 3) { // East or West
            // This
            for (let i = 0; i < 3; i++) { this.tiles[x][y+i].changeCollision(); }
            // Opposite
            let a1 = 24;
            if (p == 1) { a1 = -24; }
            if (this.tiles[x+a1][y] instanceof DoorTile) {
                for (let i = 0; i < 3; i++) { this.tiles[x+a1][y+i].changeCollision(); }
            }
            // North and South
            let a2 = 11
            if (p == 1) { a2 = -13; }
            let a3 = 13
            for (let i = 0; i < 2; i++) {
                if (this.tiles[x+a2][y+a3] instanceof DoorTile) {
                    for (let j = 0; j < 3; j++) {
                        this.tiles[x+a2+j][y+a3].changeCollision(); 
                    }
                }
                a3 = -11;
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
    //run everything the player needs to run during a tick
    runPlayerMovement() {
        this.player.runMoveTick(this);
    }
    runDamage(){
        this.runPlayerDamage();
    }
    runPlayerDamage(){ 
        let attacks = this.player.getAttacks();
        for(let i = 0; i<attacks.length; i++){
            this.dealDamage(attacks[i].x,attacks[i].y,attacks[i].size,attacks[i].shape,attacks[i].dmg)
        }
    }
    addTile(t,x,y) {
        if (x < 0 || y < 0) {
            console.error('error: attempt to add tile out of bounds')
        }
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
                if (this.tiles[x][y].hasLeft && this.tiles[x+1][y].hasLeft) {
                    this.tiles[x][y].hasLeft = false;
                }
                if (this.tiles[x][y].hasRight && this.tiles[x][y+1].hasRight) {
                    this.tiles[x][y].hasRight = false;
                }
            }
        }
        // generate the player's aura image
        this.player.groundImage = assets.images.aura;
    }
    displayFloor() {
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
        for (let i = 0; i< this.entities.length; i++) {
            this.entities[i].drawGround();
        }
        pop();
    }
    getObjectsToDraw(){
        let objectsToDraw = []
        objectsToDraw.push(this.player)
        let projectiles = this.player.getAbilityProjectiles()
        for(let i = 0; i<projectiles.length; i++){
            objectsToDraw.push(projectiles[i])
        }
        for(let i = 0; i<this.entities.length; i++){
            objectsToDraw.push(this.entities[i])
        }
        objectsToDraw.sort(function(a,b){return (a.x+a.y -b.x-b.y)})
        return objectsToDraw
    }
    // Displays the parts 
    displayWalls() {
        let objectsToDraw = this.getObjectsToDraw();
        let objectDrawn = [];
        for (let i = 0; i< objectsToDraw.length; i++) {
            objectDrawn.push(false);
        }
        for (let d = 0; d < this.tiles.length+this.tiles[0].length; d++) {
            for (let p = 0; p<=d; p++) {
                let x = d - p;
                let y = p;
                for (let i = 0; i<objectsToDraw.length; i++) {
                    if (!objectDrawn[i] && (x+y+1)*100 > objectsToDraw[i].x + objectsToDraw[i].w + objectsToDraw[i].y) {
                        objectsToDraw[i].draw();
                        objectDrawn[i] = true;
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
    displayGround() {

    }
    runEntityMovement(){
        this.generateNavCollideArray()
        for(let i = 0; i<this.entities.length; i++){
            if(this.entities[i].isNavigationEntity && this.entities[i].destination === undefined){
                this.entities[i].navTowardsPosition(this,this.player)
            }
            this.entities[i].runMoveTick(this);
        }
    }
    // Returns whether an object collides with anything on the level, given it has an x, y, w, and h property
    collides(other,ignore="default") {
        // If improper object properties, pass an error.
        if (typeof other.x != "number" || typeof other.y != "number" || typeof other.w != "number" || typeof other.h != "number") {
            console.error("Other object inserted into collides function of level must have type number attributes for x, y, w, and h");
        }
        if (other.x < 0 || other.y < 0 || other.x+ other.w> this.tiles.length*100 || other.h+ other.y > this.tiles[0].length*100) {
            return true
        }
        // If colliding with any tiles, return true
        for (let x = floor(other.x/100); x <= min(floor((other.x+other.w)/100),this.tiles.length-1); x++) {
            for (let y = floor(other.y/100); y <= min(floor((other.y+other.h)/100),this.tiles[x].length-1); y++) {
                if (this.tiles[x][y].isCollisionTile && this.tiles[x][y].collides(other)) {
                    return true;
                }
            }
        }
        // If colliding with any entities, return ture
        for (let i = 0; i<this.entities.length; i++){
            if (this.entities[i] != other && this.entities[i] != ignore && this.entities[i].collides(other)) {
                return true;
            }
        }
        return false;
    }
    // Returns whether an object collides with the tiles on the level, given it has an x, y, w, and h property
    collidesWithTiles(other) {
        if (typeof other.x != "number" || typeof other.y != "number" || typeof other.w != "number" || typeof other.h != "number") {
            console.error("Other object inserted into collides function of level must have type number attributes for x, y, w, and h");
        }
        if (other.x < 0 || other.y < 0 || other.x > this.tiles.length*100 || other.y > this.tiles[0].length*100) {
            return true;
        }
        for (let x = floor(other.x/100); x<=min(floor((other.x+other.w)/100),this.tiles.length-1); x++) {
            for (let y = floor(other.y/100); y<=min(floor((other.y+other.h)/100),this.tiles[x].length-1); y++) {
                if (this.tiles[x][y] && this.tiles[x][y].collides(other)) {
                    return true;
                }
            }
        }
        return false;
    }
    getProjectedMouseXY() {
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
    updateTargetPosition() {
        this.targetRotation += 1.5
        let [dx,dy] = this.getProjectedMouseXY();
        this.targetx = dx
        this.targety = dy
    }
    displayTarget() {
        let [disx,disy] = this.getProjectedMouseXY();
        push()
        translate (this.targetx,this.targety)
        rotate (this.targetRotation)
        image(assets.images.target,-100,-100,200,200)
        pop()
    }
    activateBasicAttack() {
        let [disx,disy] = this.getProjectedMouseXY();
        this.player.activateBaseAbility(disx,disy);
    }
    activateSpecialAttack() {
        let [disx,disy] = this.getProjectedMouseXY();
        this.player.activateSpecialAbility(disx,disy);
    }

    //accepts shapes: point, square, circle
    //x, y represent middle of shape.
    dealDamage(x,y,size,shape="point",dmg) {
        let doesDamagefunction;
        switch(shape) {
            case "point":
                doesDamagefunction = function(enemy) { return enemy.collides({x:x,y:y,w:0,h:0}) }
                break;
            case "rectangle":
                doesDamagefunction = function(enemy) { 
                    return enemy.collides({x:x-size/2,y:y-size/2,w:100,h:size}) 
                }
                break;
            case "circle":
                doesDamagefunction = function(enemy) { return (dist(enemy.x+enemy.w/2,enemy.y+enemy.h/2,x,y) < size) }
                break;
            case "halfcircle":
                doesDamagefunction = function(enemy) { return (false) }
                break;
            case "board":
                doesDamagefunction = function(enemy) { return (false) }
                break;    
        }
        for (let i = 0; i < this.entities.length; i++) {
            if (doesDamagefunction(this.entities[i])) {
                this.entities[i].takeDamage(dmg);
                if (this.entities[i].health <= 0) {
                    this.entities.splice(i,1);
                }
            }
        }
    }
}