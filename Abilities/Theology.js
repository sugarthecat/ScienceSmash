class Theology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 5; // cooldown length
        this.attackDelay = 9; // length of delay before attack triggers
        this.attackLength = 10; // length of attack after triggering
        this.damage = 10; // damage dealt to enemies
        this.shape = "circle"; // shape of AOE
        this.size = 700; // pixel diamater of circle AOE
    }
    draw() { // Draw projectile being thrown
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if (currentProgress > 0.8 && currentProgress < 1) {
            currentProgress/=0.8;
            
            this.x = this.targetX;
            this.y = this.targetY;
            // adjust angle
            let dispDir = atan2(this.x,this.y) - 45;
            let dispDist = dist(0,0,this.x,this.y);
            let disx = sin(dispDir)*dispDist;
            let disy = TILE_SCALE*(cos(dispDir)*dispDist);
            // draw animation
            fill(255);
            rect(disx-25,disy-25,50,50);
        }
    }
    drawGround() { // Draw attack area
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if(currentProgress < 1){
        push()
        translate(this.targetX,this.targetY)
        rotate (currentProgress * 720)
        image(assets.images.pentagram,-100*currentProgress,-100*currentProgress,200*currentProgress,200*currentProgress)
        pop()
        }
    }
}