class TutorialFrog extends MeleeEnemy {
    constructor(x, y) {
        super(x, y, 250)
        this.damage = 0
        this.moveSpeed = 500
        this.displayImage = assets.images.enemies.frog
        this.disph = 75
        this.dispw = 100
        this.setHealth(5)
    }
    drawGround() {

    }

}