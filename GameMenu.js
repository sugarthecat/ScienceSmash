class GameMenu {
    constructor() {
        this.active = false;
        this.menuPage = "main"
    }
    invertActive() {
        this.active = !this.active;
    }
    getScaleFactors() {

        //6 wide: 4 tall ratio, with 20px padding on any side
        let adjh = height; // adjusted height for calculations
        let adjw = width; // adjusted height for calculations
        let xoff = 20;
        let yoff = 20;
        if (adjw / 400 > adjh / 600) {
            adjw = adjh * 400 / 600;
            xoff = (width - adjw) / 2 + 20;
        } else {
            adjh = adjw / 400 * 600;
            yoff = (height - adjh) / 2 + 20;
        }
        adjw -= 40;
        adjh -= 40;
        return {
            adjw: adjw,
            adjh: adjh,
            yoff: yoff,
            xoff: xoff,
        }
    }
    display() {
        if (this.active) {
            let scaleFactors = this.getScaleFactors();
            let mousePos = this.getProjectedMousePosition();
            let menubackgroundColor = color(0)
            menubackgroundColor.setAlpha(200)
            fill(menubackgroundColor)
            rect(0, 0, width, height);
            push();
            noStroke();
            textAlign(CENTER)
            translate(scaleFactors.xoff, scaleFactors.yoff);;
            scale(scaleFactors.adjw / 400, scaleFactors.adjh / 600);;
            fill(160)
            if(this.mousePosInRange(10,10,390,100)){
                fill(255)
            }
            rect(10,10,380,90)
            fill(0)
            textSize(50)
            text("Exit Menu",200,70)
            pop();
        }
    }
    mousePosInRange(minx,miny,maxx,maxy){
        let mousepos = this.getProjectedMousePosition();
        return (mousepos.x >= minx && mousepos.x <= maxx && mousepos.y >= miny && mousepos.y <= maxy)
    }
    isActive() {
        return this.active
    }
    mouseClicked() {
        let mousepos = this.getProjectedMousePosition();
        if(this.menuPage == "main"){
            if(this.mousePosInRange(10,10,390,100)){
                this.active = false;
            }
        }
    }
    getProjectedMousePosition() {
        let scaleFactors = this.getScaleFactors();
        let tempMouseX = mouseX;
        let tempMouseY = mouseY;
        tempMouseX -= scaleFactors.xoff;
        tempMouseY -= scaleFactors.yoff;
        tempMouseX /= scaleFactors.adjw / 400
        tempMouseY /= scaleFactors.adjh / 600
        return {
            x: tempMouseX,
            y: tempMouseY
        }
    }
}