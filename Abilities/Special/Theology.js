class Theology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 20; // cooldown length
        this.attackDelay = 1; // length of delay before attack triggers
        this.attackLength = 2; // length of attack after triggering
        this.damage = 10; // damage dealt to enemies
        this.shape = "circle"; // shape of AOE
        this.size = 700; // pixel diamater of circle AOE
    }
    draw() { // Draw projectile being thrown
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if (currentProgress < 0.8) {
            currentProgress/=0.8;
            let heightBoost = (100*Math.sin(currentProgress * Math.PI))+(60*(1-currentProgress));
            this.x = this.targetX * currentProgress + this.startX * (1-currentProgress);
            this.y = this.targetY * currentProgress + this.startY * (1-currentProgress);
            // adjust angle
            let dispDir = atan2(this.x,this.y) - 45;
            let dispDist = dist(0,0,this.x,this.y);
            let disx = sin(dispDir)*dispDist;
            let disy = TILE_SCALE*(cos(dispDir)*dispDist);
            // draw animation
            fill(255);
            rect(disx-25,disy-heightBoost-25,50,50);
        }
    }
    drawGround() { // Draw attack area
        let currentProgress = this.attackLength - (this.attackTime/this.attackLength);
        if (currentProgress < this.attackLength) {
            circle(this.targetX,this.targetY,min((currentProgress-0.8) * 1000, this.size*2 - (currentProgress-0.8) * 1000 ));
        }
    }
}