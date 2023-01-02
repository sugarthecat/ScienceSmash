class Ability{
    constructor(reloadLength,attackLength){
        this.reloadLength = reloadLength
        this.attackLength = attackLength
        this.attackTime = 0;
        this.reloadTime = 0;
        this.finishedActivation = false;
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
        return false;
    }
    activate(){
        if(!this.isActive()){
            this.attackTime = this.attackLength
        }
    }
    isActive(){
        return this.attackTime > 0
    }
    draw(){

    }
}