class Level{
    constructor(){
        this.tiles = []
    }
    displayGround(){
        for(let i = 0; i<this.tiles.length; i++){
            if(this.tiles[i].hasGround){
                this.tiles[i].displayGround()
            }
        }
    }
    addTile(tile){
        this.tiles.push(tile)
    }
    getTiles(){
        return this.tiles
    }
    displayUpper(){
        for(let i = 0; i<this.tiles.length; i++){
            if(this.tiles[i].hasUpper){
                this.tiles[i].displayUpper()
            }
        }

    }
}