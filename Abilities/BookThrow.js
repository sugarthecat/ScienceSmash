class BookThrow extends Ability{
    constructor(){
        super(1,1)
        this.w = 10
        this.y = 10
    }
    activate(startX,startY,endX,endY){
        if(!this.isActive()){
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;

            this.x = startX
            this.y = startY
            super.activate();
        }
    }
    draw(){
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        let heightBoost = 60 * Math.sin(currentProgress * Math.PI)  
        /* boost so it isnt thrown from player's foot */ + 60 * (1-currentProgress);
        this.x = this.endX * currentProgress + this.startX * (1-currentProgress);
        this.y = this.endY * currentProgress + this.startY * (1-currentProgress);
        //adjust angle
        let dispDir = atan2(this.x+this.w/2,this.y+this.w/2);
        dispDir -= 45;
        let dispDist = dist(0,0,this.x+this.w/2,this.y+this.w/2);
        let disx = sin(dispDir)*dispDist;
        let disy = TILE_SCALE*(cos(dispDir)*dispDist);

        fill (0)
        rect (disx,disy - heightBoost,10,10)
    }
}