class Level{
    constructor(){
        this.targetRotation = 0
        this.tiles = [[]]
        //temp code
        let k = new Entity()
        k.x = 300
        k.y = 300
        k.w = 100
        k.h = 100
        k.disph = 150
        k.dispw = 50
        this.entities = [k]
    }
    displayGround(){
        // call function "displayGround" for all items in 2d array tiles where hasGround is true
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles[x].length; y++){
                if(this.tiles[x][y].hasGround){
                    this.tiles[x][y].displayGround()
                }
            }
        }
        this.displayTarget()
        for(let i = 0; i< this.entities.length; i++){
            if(this.entities[i].groundImage){
                this.entities[i].displayGround()
            }
        }
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
                if(x+1 == this.tiles.length || (this.tiles[x][y].hasLeft && this.tiles[x+1][y].hasLeft)){
                    this.tiles[x][y].hasLeft = false;
                }
                if(y+1 == this.tiles[x].length || (this.tiles[x][y].hasRight && this.tiles[x][y+1].hasRight)){
                    this.tiles[x][y].hasRight = false;
                }
            }
        }
    }
    displayUpper(player){
        let playerDrawn = false
        let entityDrawn = []
        for(let i = 0; i< this.entities.length; i++){
            entityDrawn.push(false)
        }
        if((0+0)*100> player.x+player.y){
            player.draw()
        }
        for(let d = 0; d<this.tiles.length + this.tiles[0].length ; d++){
            for(let p = 0; p<=d; p++){
                let x = d - p
                let y = p
                if(!playerDrawn && (x+y)*100< player.x+player.w/2+player.y){
                    player.draw()
                }
                for(let i = 0; i< this.entities.length; i++){
                    if(!entityDrawn[i] && (x+y)*100< this.entities[i].x+this.entities[i].w/2+this.entities[i].y){
                    this.entities[i].draw()
                    }
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
        if(other.x < 0 || other.y < 0 || other.x > this.tiles.length*100 || other.y > this.tiles[0].length*100){
            return true
        }
        for(let x = 0; x<this.tiles.length; x++){
            for(let y = 0; y<this.tiles.length; y++){
                if(this.tiles[x][y] && this.tiles[x][y].collides(other)){
                    return true;
                }
            }
        }
        for(let i = 0; i<this.entities.length; i++){
            if(this.entities[i] && this.entities[i].collides(other)){
                return true;
            }
        }
        return false;
    }

    displayTarget(){
        this.targetRotation+=1.5
        let disx = mouseX+camera.x
        let disy = mouseY+camera.y
        disy/=TILE_SCALE
        let xydist = dist(disx,disy,0,0)
        let targetAngle = atan2(disx,disy)+45
        disx = sin(targetAngle)*xydist
        disy = cos(targetAngle)*xydist
        if(!this.collides({x:disx, y:disy, w:0, h:0})){
            push()
        
            translate (disx,disy)
            rotate (this.targetRotation)
            image(images.target,-100,-100,200,200)
            pop()
        }
    }
}