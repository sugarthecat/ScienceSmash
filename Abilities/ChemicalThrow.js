class ChemicalThrow extends Ability{
    constructor(level){

        super(1,1)
        this.w = 10
        this.y = 10
        this.damage = 2;
        this.size = 200
        this.shape = "circle"
    }
    draw(){
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if(currentProgress < 0.8){
            currentProgress/=0.8
            let heightBoost = 100 * Math.sin(currentProgress * Math.PI)  
            /* boost so it isnt thrown from player's foot */ + 60 * (1-currentProgress);
            this.x = this.endX * currentProgress + this.startX * (1-currentProgress);
            this.y = this.endY * currentProgress + this.startY * (1-currentProgress);
            //adjust angle
            let dispDir = atan2(this.x+this.w/2,this.y+this.w/2);
            dispDir -= 45;
            let dispDist = dist(0,0,this.x+this.w/2,this.y+this.w/2);
            let disx = sin(dispDir)*dispDist;
            let disy = TILE_SCALE*(cos(dispDir)*dispDist);

            fill (255)
            rect (disx-25,disy - heightBoost-25,50,50)
        }
    }
    drawGround(){
        let currentProgress = 1 - (this.attackTime/this.attackLength);
        if(currentProgress >= 0.8 && currentProgress <= 1.2){
            circle(this.endX,this.endY,min((currentProgress-0.8) * 1000, 400 - (currentProgress-0.8) * 1000 ))
        }
    }
}