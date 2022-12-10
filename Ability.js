class Ability{
    constructor(reloadLength,attackLength){
        this.reloadLength = reloadLength
        this.attackLength = attackLength
        this.attackTime = 0;
        this.reloadTime = 0;
    }
    timeTick(){
        this.reloadTime -= deltaTime;
    }
    activate(){
        if(!this.isActive()){
            this.attackTime = this.attackLength
        }
    }
    isActive(){
        return this.attackTime > 0
    }
    display(){

    }
}