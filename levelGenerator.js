class levelGenerator {
    constructor() {
        this.targetRotation = 0
        this.tiles = [[]]
        //temp code
        this.entities = []
        for(let x =100; x<2000; x+=100){
            for(let y=1200; y<1800; y+=100){
                let newEnemy = new NavigationEntity(Math.floor(Math.random()*3+1))
                newEnemy.x = x
                newEnemy.y = y
                this.entities.push(newEnemy)
            }
        }
    }
}