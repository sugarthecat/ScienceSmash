class NavigationEntity extends Entity{
    constructor(x,y){
        super()
        this.x = x
        this.y = y
        this.currentTarget = {x:x,y:y}
    }
    moveTowardsPosition(level,position){
        let tfArray = []
        if(dist (position.x,position.y,this.x,this.y) > 100){
            // If further than a tile, navigate using algorithm
            for(let i = 0; i<level.tiles.length; i++){
                tfArray.push([])
                for(let j = 0; j<level.tiles[i].length; j++){
                    tfArray[i].push(!(level.tiles[i][j].isCollisionTile === true));
                }
            }
            tfArray[floor(position.x/100)][floor(position.y/100)] = 0;
            let change = true;
            while(change){
                change = false
                for(let x = 0; x<tfArray.length;x++){
                    for(let y = 0; y<tfArray[x].length; y++){
                        if(tfArray[x][y] !== false){
                            for(let x2 = x-1; x2<x+2; x2++){
                                for(let y2 = y-1; y2<y+2; y2++){
                                    if(x2 > 0 && y2 > 0 && x2 < tfArray.length && y2 < tfArray[x2].length && typeof tfArray[x2][y2] != "boolean" && (tfArray[x][y] === true || sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2))+tfArray[x2][y2] < tfArray[x][y])){
                                        tfArray[x][y] = tfArray[x2][y2] + sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2))
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
            let currentX = floor(this.x/100)
            let currentY = floor(this.y/100)
            console.log("directions:" + this.dirx + "," + this.diry)
            console.log("+1: " + tfArray[currentX+1][currentY])
            this.dirx, this.diry = 0;
            let minDistance = tfArray[currentX][currentY]
            for(let x = max(0,currentX-1); x<min(tfArray.length,currentX+2); x++){
                for(let y = max(0,currentY-1); y<min(tfArray.length,currentY+2); y++){
                      if(tfArray[x][y] < minDistance && tfArray[x][y] !== false){
                        minDistance = tfArray[x][y]
                        this.dirx = x-currentX;
                        this.diry = y-currentY;
                    }
                }
            }
            
        }else{
            this.dirx = position.x-this.x
            this.diry = position.y-this.y
        }
    }
}