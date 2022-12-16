class Enemy extends Entity {
    constructor(health=5,x=0,y=0) {
        super();
        this.maxHealth = health;
        this.health = health;
        this.isNavigationEntity = true;
        this.w = 80;
        this.h = 80;
        this.viewDistance = 25;
        this.navigateThroughEnemyCost = 5;
        this.x = x;
        this.y = y;
    }
    navTowardsPosition(level,position) {
        let tfArray = []; // board of true/false 
        if (dist(position.x,position.y,this.x,this.y) > 100) {
            // If further than a tile, navigate using algorithm
            let currentX = floor(this.x/100);
            let currentY = floor(this.y/100);
            tfArray = level.getCollisionTileArray();
            tfArray[floor(position.x/100)][floor(position.y/100)] = 0;
            let change = true;
            // While things are changing on the t/f board
            let openOptions = [
                {x: floor(position.x/100)-1, y: floor(position.y/100)},
                {x: floor(position.x/100)+1, y: floor(position.y/100)},
                {x: floor(position.x/100), y: floor(position.y/100)-1},
                {x: floor(position.x/100), y: floor(position.y/100)+1},]
            while (openOptions.length > 0) {
                change = false;
                // check every tile
                let x = openOptions[0].x
                let y = openOptions[0].y
                if (x >= 0 && y >= 0 && x < tfArray.length && y < tfArray[x].length && tfArray[x][y] !== false) {
                    // check if each can be navigated to from a neighboring tile, or navigated via a shorter path.
                    for (let x2 = x-1; x2<x+2; x2++) {
                        for (let y2 = y-1; y2<y+2; y2++) {
                            if ((x2 == x || y2 == y) 
                            && x2 > 0 
                            && y2 > 0 
                            && x2 < tfArray.length 
                            && y2 < tfArray[x2].length 
                            && typeof tfArray[x2][y2] != "boolean" 
                            && (tfArray[x][y] === true 
                            || sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2)) + level.sharedNavCollide(x2,y2,this)*this.navigateThroughEnemyCost + tfArray[x2][y2] < tfArray[x][y])
                            && sqrt(abs(x-x2)*abs(x-x2)+abs(y-y2)*abs(y-y2)) + level.sharedNavCollide(x2,y2,this)*this.navigateThroughEnemyCost + tfArray[x2][y2] < this.viewDistance
                            ) {
                                tfArray[x][y] = tfArray[x2][y2] + dist(x,y,x2,y2) + level.sharedNavCollide(x2,y2,this)*this.navigateThroughEnemyCost;
                                change = true;
                                openOptions.push({x:x-1, y:y})
                                openOptions.push({x:x+1, y:y})
                                openOptions.push({x:x, y:y-1})
                                openOptions.push({x:x, y:y+1})
                            }
                        }
                    }
                }
                openOptions.shift();
            } 
            for (let x = 0; x<tfArray.length;x++) {
                for (let y = 0; y<tfArray[x].length; y++) {
                    if (tfArray[x][y] === true) {
                        tfArray[x][y] = false;
                    }
                }
            }
            this.dirx, this.diry = 0;
            let minDistance = tfArray[currentX][currentY];
            let possArray = [[currentX,currentY]];
            for (let x = max(0,currentX-1); x<min(tfArray.length,currentX+2); x++) {
                for (let y = max(0,currentY-1); y<min(tfArray.length,currentY+2); y++) {
                    if (tfArray[x][y] < minDistance && tfArray[x][y] !== false && ((y == currentY || x == currentX))) {
                        minDistance = tfArray[x][y];
                        possArray = [[x,y]];
                    } else if (tfArray[x][y] == minDistance && tfArray[x][y] !== false && ((y == currentY || x == currentX))) {
                        possArray.push([x,y]);
                    }
                }
            }
            let choice = random(possArray);
            this.possArray = possArray;
            this.choice = choice;
            this.destination = {x:choice[0]*100+50-this.w/2, y: choice[1]*100+50-this.h/2};
            this.d2 = {x:choice[0]*100+50-this.w/2, y: choice[1]*100+50-this.h/2}
            this.tfA = tfArray;

        } else {
            this.dirx = position.x-this.x;
            this.diry = position.y-this.y;
        }
    }
    takeDamage(damage) {
        this.health -= damage;
    }
    drawHealthBar(disx,disy) {
        fill(0,255,0);
        rect(disx-5,disy-15,(this.dispw+10)*this.health/this.maxHealth,10);
        fill(255,0,0);
        rect(disx-5+(this.dispw+10)*this.health/this.maxHealth, disy-15, (this.dispw+10)*(1-this.health/this.maxHealth), 10);
    }
    runMoveTick(level){
        
        if (this.destination) {
            this.dirx = this.destination.x - this.x;
            this.diry = this.destination.y - this.y;
            if ( dist(this.destination.x,this.destination.y,this.x,this.y)<this.moveSpeed * deltaTime/100  ) {
                this.x = this.destination.x;
                this.y = this.destination.y;
                this.dirx = 0;
                this.diry = 0;
                this.destination = undefined;
            } 
        }else{
            this.dirx = 0
            this.diry = 0
        }
        super.runMoveTick(level)
    }
}