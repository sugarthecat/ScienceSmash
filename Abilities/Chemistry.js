class ChemicalThrow extends Ability {
    constructor() {
        super(5,1); // reloadTime,attackLength
        this.damage = 2;
        this.shape = "circle";
        this.size = 300; // pixel radius of circle AOE
    }
    // Draw projectile being thrown
    draw() {
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if (currentProgress < 0.8) {
            currentProgress/=0.8;
            let heightBoost = (100*Math.sin(currentProgress * Math.PI)) /*boost so it isnt thrown from player's foot*/+(60*(1-currentProgress));
            this.x = this.targetX * currentProgress + this.startX * (1-currentProgress);
            this.y = this.targetY * currentProgress + this.startY * (1-currentProgress);
            let dispDir = atan2(this.x,this.y) - TILT; // adjust angle
            let dispDist = dist(0,0,this.x,this.y);
            let disx = sin(dispDir)*dispDist;
            let disy = TILE_SCALE*(cos(dispDir)*dispDist);
            fill (255);
            rect (disx-25,disy - heightBoost-25,50,50);
        }
    }
    // Draw attack area
    drawGround() {
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if (currentProgress >= 0.8 && currentProgress <= 1.2) {
            circle(this.targetX,this.targetY,min((currentProgress-0.8) * 1000, this.size*2 - (currentProgress-0.8) * 1000 ));
        }
    }
}