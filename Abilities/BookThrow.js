class BookThrow extends Ability {
    constructor() {
        super(.5,.15); // reloadLength,attackLength
        this.damage = 1;
        this.shape = "point";
        this.size = 0;
    }
    // Draw projectile being thrown
    draw() {
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        let heightBoost = (10*Math.sin(currentProgress * Math.PI)) /*boost so it isnt thrown from player's foot*/+(60*(1-currentProgress));
        this.x = this.targetX * currentProgress + this.startX * (1-currentProgress);
        this.y = this.targetY * currentProgress + this.startY * (1-currentProgress);
        // adjust angle
        let dispDir = atan2(this.x,this.y) - TILT;
        let dispDist = dist(0,0,this.x,this.y);
        let disx = sin(dispDir)*dispDist;
        let disy = TILE_SCALE*(cos(dispDir)*dispDist);
        // draw animation
        fill (255);
        rect (disx-25,disy - heightBoost-25,50,50);
    }
}