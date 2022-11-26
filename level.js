class Level {
    constructor(lvl) {
        this.tiles = [[]];
        this.lvl = lvl; // integer representation of what level the player is on
        this.targetRotation = 0;
        this.player = new Player(500,500);
        this.entities = [];
        this.tileTable = new p5.Table([]);
        this.layout = [[]];
        this.rooms = [];
        //let mainRooms = [1, 1, 1, 1, 1, 1, 1, 1, 2, 3]; (commented out until loot and shop rooms are implemented)// 80% chance for standard, 10% chance for loot, 10% chance for shop
        let mainRoomsTypes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.rooms.push(new Room(0)); // Push an initial room
        if (this.lvl == 0) { // lvl 0 is the tutorial
            for (let i = 1; i < 5; i++) {
                this.rooms.push(new Room(i)); // Push a standard, loot, shop, and progression room
            }
        } else {
            for (let i = 0; i < this.lvl; i++) { // For every level
                this.rooms.push(new Room(mainRoomsTypes[Math.floor(Math.random() * 10)])); // Randomly push one of the main room types
            }
            if (this.lvl % 10) { // If its a tenth level, push a boss room
                this.rooms.push(new Room(5));
            } else { // Otherwise, push a normal progression room
                this.rooms.push(new Room(4));
            }
        }
        let LP = [[]]; // layout positions
        for (let i = 0; i < this.rooms.length; i++) {
            if (i = 0) {
                //layout[0][0] = 
            }
            let dir = Math.floor(Math.random() * 4); // 0N 1E 2S 3W
            let branch = LP[Math.floor(Math.random() * LP.length)]; // 0N 1E 2S 3W
        }
        for (let i = 0; i < this.layout.length * 25; i++) {
            //this.tileTable.addRow;
        }
    }
    generateTiles(tileTable) {
        for (var x = 0; x < tileTable.getRowCount(); x++) {
            for (var y = 0; y < tileTable.getColumnCount(); y++) {
                if (tileTable.getString(x, y) == "w") { // wall
                    this.addTile(new CollisionTile(assets.images.walls[0], assets.images.walls[0]), x, y);
                } else if (tileTable.getString(x, y) == "g") { // ground
                    this.addTile(new Tile(assets.images.floors[0]), x, y);
                } else if (tileTable.getString(x, y) == "v") { // void
                    this.addTile(new VoidTile(assets.images.void[0]), x, y);
                } else if (tileTable.getString(x, y) == "t") { // trap
                    // add trap tile
                } else if (tileTable.getString(x, y) == "e") { // explosive
                    // add explosive tile
                } else if (tileTable.getString(x, y) == "c") { // chest
                    // add chest tile
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
    finishSetup() {
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