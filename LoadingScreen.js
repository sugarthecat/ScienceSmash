class LoadingScreen{
    constructor(maxload){
        this.maxload = maxload
        this.loadTick = 0
        this.loadsLeft = maxload
    }
    itemLoaded(){
        this.loadsLeft--;
    }
    loaded(){
        return this.loadsLeft == 0 && this.loadTick>1
    }
    draw(){
        let loadProgress = min((this.maxload-this.loadsLeft)/this.maxload,this.loadTick)
        if(this.loadTick <= loadProgress){
        this.loadTick+=0.015
        }
        // Draw loading screen
        background(180,200,250)
        fill(0)
        rectMode(CORNER)
        quad(width*0.1,height*0.9,
            width*0.5,height*0.9,
            width*0.3,height*0.3,
            width*0.3,height*0.3)
        rect(width*0.1,height*0.9,width*0.4,height*0.05)
        rect(width*0.25,height*0.1,width*0.1,height*0.6)
        fill (0,255,0)
        // Start 0.125 - 0.475, 
        quad(width*0.125,height*0.9,
        width*0.475,height*0.9,
        width*(0.475-loadProgress*0.15),height*(0.9-loadProgress*0.45),
        width*(0.125+loadProgress*0.15),height*(0.9-loadProgress*0.45))
    }
}
    