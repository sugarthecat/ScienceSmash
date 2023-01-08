class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 10;
        this.dirx = 50; // 1, 0, or -1, representing direction x
        this.diry = 50; // 1,0, or -1, representing direction y
        this.dispw = 50; //display width
        this.disph = 100; //display height
        this.moveSpeed = 250;
    }
    //Given the level object, returns true if this player is colliding with any objects.
    //returns if it collides with another object
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
    }
    atanCollides(other) { // TODO under construction
        console.log("test");
        console.log(other)
        return (atan2(this.x + this.w) > other.x && other.x + other.w > atan2(this.x) && atan2(this.y + this.h) > other.y && other.y + other.h > atan2(this.y));
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    // Updates the entity's x and y positions.
    runMoveTick(level) {
        let oldX = this.x;
        let oldY = this.y;
        let directionDistance = sqrt(this.dirx * this.dirx + this.diry * this.diry); //Distance of dirx and diry, used to get directions
        if (directionDistance != 0) {
            this.x += this.dirx * this.moveSpeed / directionDistance * min(deltaTime / 1000, 0.5);
            this.y += this.diry * this.moveSpeed / directionDistance * min(deltaTime / 1000, 0.5); //Framerate speed limited to 2 FPS to block phasing through walls
            // Accounts for distance via pythagorean theorem if there is movement.
        }
        if (level.collides(this)) {
            // decollide
            let newX = this.x;
            let newY = this.y;
            this.x = oldX;
            this.y = oldY;
            let increment = 2;
            for (let i = 0; i < 6; i++) {
                // increments closer, seperated X and Y in smaller and smaller measurements
                this.x += (newX - oldX) / increment;
                if (level.collides(this)) {
                    this.x -= (newX - oldX) / increment;
                }
                this.y += (newY - oldY) / increment;
                if (level.collides(this)) {
                    this.y -= (newY - oldY) / increment;
                }
                increment *= 2;
            }
        }
    }
    //draw ground segment of character
    drawGround() {
        noStroke();
        fill(50, 200, 100);
        if (this.groundImage) {
            image(this.groundImage, this.x, this.y, this.w, this.h);
        } else {
            rect(this.x, this.y, this.w, this.h);
        }
    }
    //draw upright section of character
    draw() {
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x + this.w / 2, this.y + this.w / 2);
        dispDir -= 45;
        let dispDist = dist(0, 0, this.x + this.w / 2, this.y + this.w / 2);
        let disx = sin(dispDir) * dispDist - this.dispw / 2;
        let disy = TILE_SCALE * (cos(dispDir) * dispDist) - this.disph;
        fill(255, 100, 50);
        rect(disx, disy, this.dispw, this.disph);
        if (this.isNavigationEntity) {
            this.drawHealthBar(disx, disy);
        }
    }
}