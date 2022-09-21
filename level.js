class Level{
    constructor(){
        this.tiles = [[]]
    }
    displayGround(){
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles.length; y++){
                if(this.tiles[x][y].hasGround){
                    this.tiles[x][y].displayGround()
                }
            }
        }
    }
    addTile(tile,x,y){
        while(x >= this.tiles.length){
            this.tiles.push([])
        }
        while(y >= this.tiles[x].length){
            this.tiles[x].push(null)
        }
        this.tiles[x][y] = tile
    }
    getTiles(){
        return this.tiles
    }
    finishSetup(){
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles[x].length; y++){
                if(y+1<this.tiles[x].length && this.tiles[x][y].hasLeft && this.tiles[x][y+1].hasLeft){
                    this.tiles[x][y].hasLeft = false;
                }
                if(x+1<this.tiles.length && this.tiles[x][y].hasRight && this.tiles[x+1][y].hasRight){
                    this.tiles[x][y].hasRight = false;
                }
            }
        }
    }
    displayLeft(){
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles.length; y++){
                if(this.tiles[x][y].hasLeft){
                    this.tiles[x][y].displayLeft()
                }
            }
        }
    }
    displayRight(){
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles.length; y++){
                if(this.tiles[x][y].hasRight){
                    this.tiles[x][y].displayRight()
                }
            }
        }
    }
    collides(other){
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles.length; y++){
                if(this.tiles[x][y] && this.tiles[x][y].collides(other)){
                    return true;
                }
            }
        }
        return false;
    }
}