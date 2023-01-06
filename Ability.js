class Ability {
    constructor(reloadTime,attackTime) {
        this.reloadTime = reloadTime;
        this.attackTime = attackTime;
        this.attackTime = 0;
        this.reloadTime = 0;
        //this.x = 0;
        //this.y = 0;
        this.finishedActivation = false;
        this.damage = 0;
        this.shape = "point"; // defaultly single point ability
        this.size = 0;
        this.powerScale = 1; // every ability starts at powerScale x1
    }
    scalePower() {
        if (powerScale < 2.5) {
            powerScale += 0.5
        } else {
            // TODO: alert the player that the maximum diploma level has been reached, and give them 50 coins instead
        }
    }
    timeTick() {
        let previouslyActive = this.isActive();
        this.reloadTime -= deltaTime/1000;
        this.attackTime -= deltaTime/1000;
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
    activate(startX,startY,endX,endY) {
        if (!this.isActive() && this.canActivate()) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.x = startX;
            this.y = startY;
            this.attackTime = this.attackTime;
            this.reloadTime = this.reloadTime;
        }
    }
    isActive(){
        return this.attackTime > 0;
    }
    canActivate(){
        return this.reloadTime < 0;
    }
    draw() {

    }
    drawGround() {

    }
}