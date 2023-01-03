class Ability{
    constructor(reloadLength,attackLength){
        this.reloadLength = reloadLength
        this.attackLength = attackLength
        this.attackTime = 0;
        this.reloadTime = 0;
        this.finishedActivation = false;
        this.damage = 0
        this.shape = "point"
        this.size = 0
    }
    timeTick(){
        let previouslyActive = this.isActive()
        this.reloadTime -= deltaTime/1000;
        this.attackTime -= deltaTime/1000;
        if(!this.finishedActivation){
            this.finishedActivation = previouslyActive && !this.isActive()
        }
    }
    // returns if it needs to be activated. 
    // true return means it will return false until ability cycle repeats
    getActivationStatus(){
        if(this.finishedActivation){
            this.finishedActivation = false;
            return true;
        }
        return false;
    }
    activate(startX,startY,endX,endY){
        if(!this.isActive() && this.canActivate()){
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;

            this.x = startX
            this.y = startY
            this.attackTime = this.attackLength
            this.reloadTime = this.reloadLength
        }
    }
    isActive(){
        return this.attackTime > 0
    }
    canActivate(){
        return this.reloadTime < 0
    }
    draw(){

    }
    drawGround(){

    }
}