class Geology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 2; // cooldown length
        this.attackDelay = 1; // length of delay before attack triggers
        this.attackLength = 1; // length of attack after triggering
        this.damage = 5; // damage dealt to enemies
        this.shape = "rectangle"; // shape of AOE
        this.size = 500; // pixel radius of circle AOE
    }
    draw() {

    }
    drawGround() { // Draw attack area
        let currentProgress = 1 - (this.attackTime / this.attackLength);
        if (currentProgress < 1) {
            push();
            translate(this.startX, this.startY);
            rotate(atan2(this.targetY - this.startY, this.targetX - this.startX));
            fill('red');
            rect(0, -50, this.size, 100);
            pop();
        }
    }
}