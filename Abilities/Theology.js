class Theology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 15; // cooldown length
        this.attackDelay = 9; // length of delay before attack triggers
        this.attackLength = 5; // length of attack after triggering
        this.damage = 10; // damage dealt to enemies
        this.shape = "circle"; // shape of AOE
        this.size = 800; // pixel diamater of circle AOE
    }
    draw() { // Draw projectile being thrown
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if (currentProgress > 1 && currentProgress < 1.5) {
            
            this.x = this.targetX;
            this.y = this.targetY;
            // adjust angle
            let dispDir = atan2(this.x,this.y) - 45;
            let dispDist = dist(0,0,this.x,this.y);
            let disx = sin(dispDir)*dispDist;
            let disy = TILE_SCALE*(cos(dispDir)*dispDist);
            // draw animation
            let xshift = (20 * Math.random()-10)
            let yshift =  (10 * Math.random() - 5)
            fill(255);
            image(assets.images.laserbeambody,xshift+disx-100 ,yshift+disy-2000,200,1800);
            image(assets.images.laserbeam,xshift+disx-100 ,yshift+disy-200,200,200);
        }
    }
    drawGround() { // Draw attack area
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if(currentProgress < 1){
        push()
        translate(this.targetX,this.targetY)
        rotate (currentProgress * 1080)
        image(assets.images.pentagram,-100*currentProgress,-100*currentProgress,200*currentProgress,200*currentProgress)
        pop()
        }
    }
}