class NavigationEntity extends Entity{
    constructor(x,y){
        super()
        this.x = x
        this.y = y
        this.currentTarget = {x:x,y:y}
    }
    moveTowardsPosition(level,position){
        let tfArray = []
        for(let i = 0; i<level.tiles.length; i++){
            tfArray.push([])
            for(let j = 0; j<level.tiles[i].length; j++){
                tfArray[i].push(!(level.tiles[i][j].isCollisionTile === true));
            }
        }
        tfArray[floor(this.x/100)][floor(this.y/100)] = 0;
        let change = true;
        while(change){
            change = false
            for(let x = 0; x<tfArray.length;x++){
            for(let y = 0; y<tfArray[x].length; y++){
                    if(tfArray[x][y] !== false){
                        for(let x2 = x-1; x2<x+2; x2++){
                            for(let y2 = y-1; y2<y+2; y2++){
                                if(x2 > 0 && y2 > 0 && x2 < tfArray.length && y2 < tfArray[x2].length && (tfArray[x][y] === true || sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2))+tfArray[x2][y2] < tfArray[x][y])){
                                    tfArray[x][y] = tfArray[x2][y2] + sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2))
                                    change = true;
                                }
                            }
                        }

                    }
                }
            }
        }
        console.log(tfArray)
        
    }
}