class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 30;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){

    }
}

class Skeleton extends Enemy {
    constructor() {
        super();
        this.w = 50; //temp
        this.h = 50; //temp
        this.x = 50; //temp
        this.y = 50; //temp
        this.speedX = 50; //temp
        this.speedY = 50; //temp
        this.dirx = 50 // 1, 0, or -1, representing direction x
        this.diry = 50// 1,0, or -1, representing direction y
        this.dispw = 50 //display width
        this.disph = 50 //display height
    }
}

class Ghost extends Enemy {
    constructor() {
        super();
        this.w = 50; //temp
        this.h = 50; //temp
        this.x = 50; //temp
        this.y = 50; //temp
        this.speedX = 50; //temp
        this.speedY = 50; //temp
        this.dirx = 50 // 1, 0, or -1, representing x direction
        this.diry = 50// 1,0, or -1, representing direction y
        this.dispw = 50 //display width
        this.disph = 50 //display height
    }
}