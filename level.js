class Level{
    constructor(){
        this.targetRotation = 0
        this.tiles = [[]]
        this.entities = []
    }
    displayGround(){
        // call function "displayGround" for all items in 2d array tiles where hasGround is true
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles.length; y++){
                if(this.tiles[x][y].hasGround){
                    this.tiles[x][y].displayGround()
                }
            }
        }
        this.displayTarget()
    }
    addTile(t,x,y){
        let tile = t
        tile.x = x * 100
        tile.y = y * 100
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
                if(x+1 == this.tiles[x].length || (this.tiles[x][y].hasLeft && this.tiles[x+1][y].hasLeft)){
                    this.tiles[x][y].hasLeft = false;
                }
                if(y+1 == this.tiles.length || (this.tiles[x][y].hasRight && this.tiles[x][y+1].hasRight)){
                    this.tiles[x][y].hasRight = false;
                }
            }
        }
    }
    displayUpper(player){
        let playerDrawn = false
        if((0+0)*100> player.x+player.y){
            player.draw()
        }
        for(let d = 0; d<this.tiles.length + this.tiles[0].length ; d++){
            for(let p = 0; p<=d; p++){
                let x = d - p
                let y = p
                if((x+y)*100< player.x+player.w/2+player.y){
                    player.draw()
                }
                if( x < this.tiles.length && y < this.tiles[x].length){
                    if(this.tiles[x][y].hasLeft){
                        push()
                        this.tiles[x][y].displayLeft()
                        pop()
                    }
                    if(this.tiles[x][y].hasRight){
                        push()
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
        for(let i = 0; i<this.entities.length; i++){
            if(this.entities[i] && this.entities.collides(other)){
                return true;
            }
        }
        return false;
    }

    displayTarget(){
        this.targetRotation+=1.5
        push()
        let disx = mouseX+camera.x
        let disy = mouseY+camera.y
        disy/=TILE_SCALE
        let xydist = dist(disx,disy,0,0)
        let targetAngle = atan2(disx,disy)+45
        disx = sin(targetAngle)*xydist
        disy = cos(targetAngle)*xydist
        translate (disx,disy)
        rotate (this.targetRotation)
        image(images.target,-100,-100,200,200)
        pop()
    }
}