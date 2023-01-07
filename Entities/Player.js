class Player extends Entity {
    constructor() {
        super();
        // position
        this.x = 0;
        this.y = 0;
        // hitbox size
        this.w = 80;
        this.h = 80;
        // direction facing
        this.dirx = 0; // 1, 0, or -1, representing direction x
        this.diry = 0; // 1,0, or -1, representing direction y
        // display size
        this.dispw = 70;
        this.disph = 90;
        // movement and animation
        this.normalMoveSpeed = 400;
        this.dashSpeed = 1200;
        this.dashTimer = 0
        this.phase = 0;
        this.facingLeft = false;
        // true if the player is on a door
        this.onDoor = false; 
        // abilities
        this.baseAbility = new BookThrow();
        this.specialAbility = new Theology();
        this.allBaseAbilities = [this.baseAbility];
        this.allSpecialAbilities = [this.specialAbility];
    }
    drawGround() {
        this.baseAbility.drawGround();
        this.specialAbility.drawGround();
        super.drawGround();
    }
    isMovingUp() {
        return this.dirx + this.diry < 0;
    }
    isMovingDown() {
        return this.dirx + this.diry > 0;
    }
    isMovingRight() {
        return this.dirx - this.diry > 0;
    }
    isMovingLeft() {
        return this.dirx - this.diry < 0;

    }
    activateBaseAbility(attackTargetX,attackTargetY) {
        this.baseAbility.activate(
            this.x + this.w/2,
            this.y + this.h/2,
            attackTargetX,
            attackTargetY);
    }
    activateSpecialAbility(attackTargetX,attackTargetY) {
        this.specialAbility.activate(
            this.x + this.w/2,
            this.y + this.h/2,
            attackTargetX,
            attackTargetY);
    }
    // Ensures that dirx and diry are correct.
    fixDirections() {
        // Checks for movement key activations.
        let right =  keyIsDown(68); // D key
        let left =  keyIsDown(65); // A key
        let up = keyIsDown(87); // W key
        let down =  keyIsDown(83); // S key
        // Resolves key conflicts to ensure that if two opposite directions are attempted at the same time, nothing happens.
        if (this.dashTimer <= 0) {
            this.moveSpeed = this.normalMoveSpeed;
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
        } else {
            this.moveSpeed = this.dashSpeed;
        }
    }
    getAbilityProjectiles() {
        let objectsToReturn = [];
        if (this.baseAbility.isActive()) {
            objectsToReturn.push(this.baseAbility);
        }
        if (this.specialAbility.isActive()) {
            objectsToReturn.push(this.specialAbility);
        }
        return objectsToReturn;
    }
    // draw upright display of character
    draw() {
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x+this.w/2,this.y+this.w/2);
        dispDir -= 45;
        let dispDist = dist(0,0,this.x+this.w/2,this.y+this.w/2);
        let disx = sin(dispDir)*dispDist - this.dispw/2;
        let disy = TILE_SCALE*(cos(dispDir)*dispDist) - this.disph;
        fill(255,100,50);
        push();
        if (this.facingLeft) {
            scale(-1,1);
            disx *= -1;
            disx -= this.dispw;
        }
        this.phase += 0.3;
        if (this.dirx == 0 && this.diry == 0) {
            this.phase = this.phase % assets.images.player.idle.length;
            image(assets.images.player.idle[floor(this.phase)], disx, disy, this.dispw, this.disph);
        } else {
            this.phase = this.phase % assets.images.player.run.length;
            image(assets.images.player.run[floor(this.phase)], disx, disy, this.dispw, this.disph);
        }
        pop();
    }
    activateDash() {
        if (this.dashTimer <= 0 && (this.dirx != 0 || this.diry != 0)) {
            this.dashTimer = 0.2;
        }
    }
    runMoveTick(level) {
        if (this.dashTimer && this.dashTimer >= 0) {
            this.dashTimer -= deltaTime/1000;
        }
        this.baseAbility.timeTick();
        this.specialAbility.timeTick();
        super.runMoveTick(level);
        this.fixDirections();
    }
    getAttacks() {
        let attacks = [];
        if (this.baseAbility.getActivationStatus()) {
            attacks.push({x: this.baseAbility.targetX,
                        y: this.baseAbility.targetY,
                        size: this.baseAbility.size,
                        shape: this.baseAbility.shape,
                        dmg: this.damage })
        }
        if (this.specialAbility.getActivationStatus()) {
            attacks.push({x: this.specialAbility.targetX,
                        y: this.specialAbility.targetY,
                        size: this.specialAbility.size,
                        shape: this.specialAbility.shape,
                        dmg: this.damage })
        }
        return attacks;
    }
}