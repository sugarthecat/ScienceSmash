class TutorialFrog extends MeleeEnemy{
    constructor(x,y){
        super(x,y)
        this.recoilDistance = 250
        this.viewDistance = 50
        this.damage = 0
        this.moveSpeed = 200
        this.displayImage = assets.images.enemies.frog
        this.disph = 75
        this.dispw = 100
        this.setHealth(5)
    }
    drawGround(){

    }

}