class Ability {
    constructor() {
        this.attackTime = -20;
        this.cooldownTime = 0;
        this.x = 0;
        this.y = 0;
        this.w = 0; // I don't know why this is here, but when I delete it, abilities don't work.
        this.startX = 0;
        this.startY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.finishedActivation = false;
        this.powerScale = 1; // every ability starts at powerScale x1
    }
    inflictPoison() {

    }
    inflictBurning() {

    }
    inflictRegeneration() {

    }
    inflictStun() {

    }
    inflictParalysis() {

    }
    scalePower() {
        if (powerScale < 2.5) {
            powerScale += 0.5;
        } else {
            // TODO: alert the player that the maximum diploma level has been reached, and give them 50 coins instead
        }
    }
    timeTick() {
        let previouslyActive = this.isActive();
        this.cooldownTime -= deltaTime * 0.001;
        this.attackTime -= deltaTime * 0.001;
        if (!this.finishedActivation) {
            this.finishedActivation = previouslyActive && !this.isActive();
        }
    }
    // returns if it needs to be activated. 
    // true return means it will return false until ability cycle repeats
    getActivationStatus() {
        if (this.finishedActivation) {
            this.finishedActivation = false;
            return true;
        }
        return false;
    }
    activate(startX, startY, targetX, targetY) {
        if (!this.isActive() && this.canActivate()) {
            this.startX = startX;
            this.startY = startY;
            this.targetX = targetX;
            this.targetY = targetY;
            this.x = startX;
            this.y = startY;
            this.degree = atan2(this.targetY - this.startY, this.targetX - this.startX);
            this.attackTime = this.attackLength;
            this.cooldownTime = this.cooldownLength;
        }
    }
    isActive() {
        return this.attackTime > 0;
    }
    canActivate() {
        return this.cooldownTime < 0;
    }
    draw() {

    }
    drawGround() {

    }
}