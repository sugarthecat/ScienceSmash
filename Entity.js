class Entity {
    constructor() {
        this.maxHealth = 1;
        this.health = 1;
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;
        this.dirx = 50; // 1, 0, or -1, representing direction x
        this.diry = 50; // 1,0, or -1, representing direction y
        this.dispw = 50; //display width
        this.disph = 100; //display height
        this.moveSpeed = 250;
    }
    //Given the level object, returns true if this player is colliding with any objects.
    //returns if it collides with another object
    setHealth(health) {
        this.health = health
        if (this.maxHealth < health) {
            this.maxHealth = health
        }
    }
    getMaxHealth() {
        return this.maxHealth;
    }
    heal(amount) {
        this.health += amount;
    }
    takeDamage(damage) {
        this.health -= damage;
    }
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
    }
    degreeCollides(other, degrees) {
        let otherTarget1 = other.degree - degrees / 2;
        let otherTarget2 = other.degree + degrees / 2;
        let thisDeg = atan2(this.y + this.h / 2 - other.startY, this.x + this.w / 2 - other.startX);
        return ((dist(this.x + this.w / 2, this.y + this.h / 2, other.x, other.y) < other.size) && (thisDeg > otherTarget1) && (thisDeg < otherTarget2));
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
    drawHealthBar(disx, disy) {
        fill(0, 255, 0);
        rect(disx - 5, disy - 15, (this.dispw + 10) * this.health / this.maxHealth, 10);
        fill(255, 0, 0);
        rect(disx - 5 + (this.dispw + 10) * this.health / this.maxHealth, disy - 15, (this.dispw + 10) * (1 - this.health / this.maxHealth), 10);
    }
    //draw upright section of character
    draw() {
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x + this.w / 2, this.y + this.w / 2);
        dispDir -= 45;
        let dispDist = dist(0, 0, this.x + this.w / 2, this.y + this.w / 2);
        let disx = sin(dispDir) * dispDist - this.dispw / 2;
        let disy = TILE_SCALE * (cos(dispDir) * dispDist) - this.disph;
        push();
        if (this.destination) {
            if (this.x - this.y + this.destination.y - this.destination.x < 0) {
                this.facingLeft = true
            } else {
                this.facingLeft = false
            }
        }
        if (this.facingLeft) {
            scale(-1, 1);
            disx *= -1;
            disx -= this.dispw;
        }
        if (this.displayImage) {
            image(this.displayImage, disx, disy, this.dispw, this.disph);

        } else {
            rect(disx, disy, this.dispw, this.disph);
        }
        if (this.facingLeft) {
            disx += this.dispw;
            disx *= -1;
        }
        pop();
        this.drawHealthBar(disx, disy);

    }
}