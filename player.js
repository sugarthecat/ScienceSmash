class Player extends Entity{
    // Constructor.
    constructor(x,y){
        super()
        this.x = x
        this.y = y
        this.w = 80 // width (constant)
        this.h = 80 // height (constant)
        this.dirx = 0 // 1, 0, or -1, representing direction x
        this.diry = 0// 1,0, or -1, representing direction y
        this.dispw = 40
        this.disph = 90
        this.moveSpeed = 10
    }

    // Ensures that dirx and diry are correct.
    fixDirections(){
        // Checks for movement key activations.
        let right = keyIsDown(RIGHT_ARROW) || keyIsDown(68) // D key
        let left = keyIsDown(LEFT_ARROW) || keyIsDown(65) // A key
        let up = keyIsDown(UP_ARROW) || keyIsDown(87) // W key
        let down = keyIsDown(DOWN_ARROW) || keyIsDown(83) // S key
        // Resolves key conflicts to ensure that if two opposite directions are attempted at the same time, nothing happens.
        this.dirx = 0
        this.diry = 0
        if(right && !left){
            this.dirx = 1
            this.diry = -1
            // moving right and not left, convert to actual grid.
        }else if(left && !right){
            this.dirx = -1
            this.diry = 1
            // moving left and not right, convert to actual grid.
        }
        if(down && !up){
            this.diry += 1
            this.dirx += 1
            // moving down and not up, convert to actual grid.
        }else if(up && !down){
            this.diry += -1
            this.dirx += -1
            // moving up and not down, convert to actual grid.
        }
        
    }
    
}