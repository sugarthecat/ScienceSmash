class Chest extends Item {
    constructor() {
        super();
        this.w = 50;
        this.h = 50;
    }
    draw() {
        push();
        rect(this.x,this.y,this.w,this.h);
        pop();
    }
}