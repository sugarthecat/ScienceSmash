class Level{
    constructor(){
        this.tiles = []
    }
    displayGround(){
        for(let i = 0; i<this.tiles.length; i++){
            this.tiles[i].displayGround()
        }
    }
    addTile(tile){
        this.tiles.push(tile)
    }
    getTiles(){
        return this.tiles
    }
}