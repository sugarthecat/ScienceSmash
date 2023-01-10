class Geology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 2; // cooldown length
        this.attackDelay = 1; // length of delay before attack triggers
        this.attackLength = .2; // length of attack after triggering
        this.damage = 5; // damage dealt to enemies
        this.shape = "rectangle"; // shape of AOE
        this.size = 500; // pixel radius of circle AOE
        this.degree = 0;
    }
    draw() {

    }
    drawGround() { // Draw attack area
        let currentProgress = 1 - (this.attackTime / this.attackLength);
        if (currentProgress < 1) {
            push();
            translate(this.startX, this.startY);
            rotate(this.degree-90);
            image(assets.images.cone,-50,0,100,this.size);
            noFill();
            rect(-50,0,100,this.size);
            pop();
        }
    }
}