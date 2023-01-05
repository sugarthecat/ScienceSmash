class BookThrow extends Ability {
    constructor() {
        super(.5,.15);
        this.w = 10;
        this.y = 10;
        this.damage = 2;
        this.shape = "point";
    }


    draw() {
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        let heightBoost = 10 * Math.sin(currentProgress * Math.PI)
        /* boost so it isnt thrown from player's foot */ + 50 * (1-currentProgress);
        this.x = this.endX * currentProgress + this.startX * (1-currentProgress);
        this.y = this.endY * currentProgress + this.startY * (1-currentProgress);
        //adjust angle
        let dispDir = atan2(this.x+this.w/2,this.y+this.w/2);
        dispDir -= 45;
        let dispDist = dist(0,0,this.x+this.w/2,this.y+this.w/2);
        let disx = sin(dispDir)*dispDist;
        let disy = TILE_SCALE*(cos(dispDir)*dispDist);

        fill (255);
        rect (disx-25,disy - heightBoost-25,50,50);
    }
}