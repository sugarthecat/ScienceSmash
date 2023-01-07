class Archery extends Ability {
    constructor() {
        super();
        this.cooldownLength = 1; // cooldown length
        this.attackDelay = .1; // length of delay before attack triggers
        this.attackLength = .1; // length of attack after triggering
        this.damage = 2; // damage dealt to enemies
        this.shape = "point"; // shape of AOE
        this.size = 0; // affects a single target
    }
    draw() { // Draw projectile being thrown
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        let heightBoost = (10*Math.sin(currentProgress * Math.PI))+(60*(1-currentProgress));
        this.x = this.targetX * currentProgress + this.startX * (1-currentProgress);
        this.y = this.targetY * currentProgress + this.startY * (1-currentProgress);
        // adjust angle
        let dispDir = atan2(this.x,this.y) - 45;
        let dispDist = dist(0,0,this.x,this.y);
        let disx = sin(dispDir)*dispDist;
        let disy = TILE_SCALE*(cos(dispDir)*dispDist);
        // draw animation
        fill (255);
        rect (disx-25,disy - heightBoost-25,50,50);
    }
}