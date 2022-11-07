class Player extends Entity{
    // Constructor.
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.w = 80;
        this.h = 80;
        this.dirx = 0; // 1, 0, or -1, representing direction x
        this.diry = 0; // 1,0, or -1, representing direction y
        this.dispw = 40;
        this.disph = 90;
        this.maxMoveSpeed = 0.5;
        this.dashTimer = 0
        this.phase = 0;
        this.facingLeft = false;
    }

    // Ensures that dirx and diry are correct.
    fixDirections() {
        // Checks for movement key activations.
        let right = keyIsDown(RIGHT_ARROW) || keyIsDown(68); // D key
        let left = keyIsDown(LEFT_ARROW) || keyIsDown(65); // A key
        let up = keyIsDown(UP_ARROW) || keyIsDown(87); // W key
        let down = keyIsDown(DOWN_ARROW) || keyIsDown(83); // S key
        // Resolves key conflicts to ensure that if two opposite directions are attempted at the same time, nothing happens.
        if(this.dashTimer <= 0){
            this.moveSpeed = this.maxMoveSpeed
            this.dirx = 0;
            this.diry = 0;
            if (right && !left) {
                this.dirx = 1;
                this.diry = -1;
                // moving right and not left, convert to actual grid.
            } else if (left && !right) {
                this.dirx = -1;
                this.diry = 1;
                // moving left and not right, convert to actual grid.
            }
            if (down && !up) {
                this.diry += 1;
                this.dirx += 1;
                // moving down and not up, convert to actual grid.
            } else if (up && !down) {
                this.diry += -1;
                this.dirx += -1;
                // moving up and not down, convert to actual grid.
            }
            if (this.facingLeft && right && !left) {
                this.facingLeft = false;
            } else if (!this.facingLeft && !right && left) {
                this.facingLeft = true;
            }
        }else{
            this.moveSpeed = this.maxMoveSpeed*3
        }
    }
    // draw upright display of character
    draw() {
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x,this.y);
        dispDir -= 45;
        let dispDist = dist(0,0,this.x,this.y);
        let disx = sin(dispDir)*dispDist - this.dispw/2;
        let disy = TILE_SCALE*(cos(dispDir)*dispDist) - this.disph * 2 + dist(0,0,this.w,this.h);
        fill(255,100,50);
        push();
        if (this.facingLeft) {
            scale(-1,1);
            disx *= -1;
            disx -= this.dispw;
        }
        if (this.dirx == 0 && this.diry == 0) {
            image(images.player.idle[floor(this.phase)], disx, disy, this.dispw, this.disph)
        } else {
            image(images.player.run[floor(this.phase)], disx, disy, this.dispw, this.disph)
        }
        pop()
        this.phase += 0.1;
        this.phase = this.phase % 4;
    }
    activateDash(){
        if(this.dashTimer <= 0 && (this.dirx != 0 || this.diry != 0)){
            this.dashTimer = 0.2
        }
    }
}