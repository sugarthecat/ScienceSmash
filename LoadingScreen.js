class LoadingScreen {
    constructor(maxload) {
        this.maxload = maxload;
        this.loadTick = 0;
        this.loadsLeft = maxload;
        this.continue = false;
    }
    fileLoaded() {
        this.loadsLeft-= 1;
    }
    draw() {
        let loadProgress = min((this.maxload - this.loadsLeft) / this.maxload, this.loadTick);
        if (this.loadTick <= loadProgress) {
            this.loadTick += 0.001*deltaTime;
        }
        // Draw loading screen
        noStroke()
        rectMode(CORNER);
        //science bottle
        //calc adjusted w/h for loadingscreen
        let adjh = height; // adjusted height for calculations
        let adjw = width; // adjusted height for calculations
        let xoff = 0
        let yoff = 0
        if (adjh/400 < adjw/600 ) {
            adjw = adjh*600/400;
            xoff = (width-adjw)/2
        } else {
           adjh = adjw/600*400;
           yoff = (height-adjh)/2
        }
        push()
        fill(180,200,250);
        translate (xoff,yoff)
        scale(adjw,adjh)
        background(0)
        rect(0,0,1,1)
        fill(0);
        quad(0.1,0.9,
            0.5,0.9,
            0.3,0.3,
            0.3,0.3);
        rect(0.1,0.9,0.4,0.05);
        rect(0.25,0.1,0.1,0.6);
        fill (0,255,0);
        // Start 0.125 - 0.475
        quad(0.125,0.9,
            0.475,0.9,
            max(0.475-loadProgress*0.25,0.3),max(0.9-loadProgress*0.75,0.375),
            min(0.125+loadProgress*0.25,0.3),max(0.9-loadProgress*0.75,0.375));
        rect(0.27,(0.9-loadProgress*0.75),0.06,(loadProgress*0.75));
        fill(0)
        textSize(0.1)
        stroke(0)
        strokeWeight(0.003)
        textAlign(CENTER)
        if (!this.loadsLeft == 0) {
            text("Loading...",0.7,0.4)
        } else {
            text("Click to continue",0.7,0.4)
        }
        text((this.maxload-this.loadsLeft)+"/"+this.maxload,0.7,0.7)
        pop()
    }
}
    