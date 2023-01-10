class Button {
    constructor(x, y, w, h,activationFunction) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.activationFunction = activationFunction
    }
    containsPoint(x,y){
        return (this.x < x && this.w + this.x < x && this.y < y && this.h + this.y < y)
    }
    clickedAt(x,y){
        if(this.containsPoint(x,y)){
            this.activationFunction();
        }
    }
    draw(){

    }
}