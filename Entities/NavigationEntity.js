class NavigationEntity extends Entity{
    constructor(health){
        super()
        this.maxHealth = health
        this.health = health
        this.isNavigationEntity = true
        this.w = 100
        this.h = 100
    }
    moveTowardsPosition(level,position){
        let tfArray = []
        if(dist (position.x,position.y,this.x,this.y) > 100){
            // If further than a tile, navigate using algorithm
            let currentX = floor(this.x/100)
            let currentY = floor(this.y/100)
            for(let i = 0; i<level.tiles.length; i++){
                tfArray.push([])
                for(let j = 0; j<level.tiles[i].length; j++){
                    
                    tfArray[i].push(!(level.sharedNavCollide(i,j,this)|| level.tiles[i][j].isCollisionTile));
                }
            }
            tfArray[floor(position.x/100)][floor(position.y/100)] = 0;
            let change = true;
            //While things are chaing on the t/f board
            while(change){
                change = false
                //check every tile 
                for(let x = 0; x<tfArray.length;x++){
                    for(let y = 0; y<tfArray[x].length; y++){
                        if(tfArray[x][y] === true){
                            //check if each 
                            for(let x2 = x-1; x2<x+2; x2++){
                                for(let y2 = y-1; y2<y+2; y2++){
                                    if((x2 == x || y2 == y) && x2 > 0 && y2 > 0 
                                    && x2 < tfArray.length && y2 < tfArray[x2].length 
                                    && typeof tfArray[x2][y2] != "boolean" 
                                    && (tfArray[x][y] === true || sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2))+tfArray[x2][y2] < tfArray[x][y])){
                                        tfArray[x][y] = tfArray[x2][y2] + dist(x,y,x2,y2)
                                        change = true;
                                    }
                                }
                            }
                        }
                    }
                }
            } 
            for(let x = 0; x<tfArray.length;x++){
                for(let y = 0; y<tfArray[x].length; y++){
                    if(tfArray[x][y] === true){
                        tfArray[x][y] = false;
                    }
                }
            }
            //console.log("directions:" + this.dirx + "," + this.diry)
            //console.log("tfArray: " + tfArray[currentX][currentY])
            this.dirx, this.diry = 0;
            let minDistance = tfArray[currentX][currentY]
            let possArray = [[currentX,currentY]]
            for(let x = max(0,currentX-1); x<min(tfArray.length,currentX+2); x++){
                for(let y = max(0,currentY-1); y<min(tfArray.length,currentY+2); y++){
                    if(tfArray[x][y] < minDistance && tfArray[x][y] !== false && ((y == currentY || x == currentX))){
                        minDistance = tfArray[x][y]
                        possArray = [[x,y]]
                    }else if(tfArray[x][y] == minDistance && tfArray[x][y] !== false && ((y == currentY || x == currentX))){
                        possArray.push([x,y])
                    }
                }
            }
            let choice = random(possArray)
            
            this.destination = {x:choice[0]*100+50-this.w/2, y: choice[1]*100+50-this.h/2}
            this.tfA = tfArray
        }else{
            this.dirx = position.x-this.x
            this.diry = position.y-this.y
        }
    }
    takeDamage(damage){
        this.health -= damage
    }
    draw(){
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x,this.y)
        dispDir -= 45
        let dispDist = dist(0,0,this.x,this.y)
        let disx = sin(dispDir)*dispDist - this.dispw/2
        let disy = TILE_SCALE*(cos(dispDir)*dispDist - this.disph)
        fill(255,100,50)
        rect(disx,disy,this.dispw,this.disph)
        //display health bars
        fill(0,255,0)
        rect(disx-5,disy-15,(this.dispw+10)*this.health/this.maxHealth,10)
        fill(255,0,0)
        rect(disx-5+(this.dispw+10)*this.health/this.maxHealth,disy-15,(this.dispw+10)*(1-this.health/this.maxHealth),10)
    }
}