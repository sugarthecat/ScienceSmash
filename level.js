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
        //remove any walls that would be behing others
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
    displayUpper(player){
        let playerDrawn = false
        for(let d = 0; d<this.tiles.length + this.tiles[0].length ; d++){
            for(let p = 0; p<=d; p++){
                let x = d - p
                let y = p
                if((x+y)*100< player.x+player.y){
                    player.draw()
                }
                if( x < this.tiles.length && y < this.tiles[x].length){
                    if(this.tiles[x][y].hasLeft){
                        push()
                        rotate(-45)
                        scale(0.6,1)
                        rotate(60)
                        this.tiles[x][y].displayLeft()
                        pop()
                    }
                    if(this.tiles[x][y].hasRight){
                        push()
                        rotate(-45)
                        scale(1,0.6)
                        rotate(30)
                        this.tiles[x][y].displayRight()
                        pop()
                    }
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