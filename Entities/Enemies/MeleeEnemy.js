class MeleeEnemy extends Enemy {
    hasDecollideFunction = true;

    constructor(x, y) {
        super(x, y);
        this.recoilDistance = 100;
    }
    decollideWithEnemy(enemy) {
        enemy.takeDamage(this.damage)
        let xdiff = enemy.x - this.x;
        let ydiff = enemy.y - this.y;
        let diffDist = dist(0, 0, xdiff, ydiff);
        let desx = enemy.x - xdiff * this.recoilDistance / diffDist
        let desy = enemy.y - ydiff * this.recoilDistance / diffDist
        this.destination = { x: desx, y: desy }
    }
}