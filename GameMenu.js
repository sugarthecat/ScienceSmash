class GameMenu {
    constructor() {
        this.active = false;
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
        if (adjh / 400 < adjw / 600) {
            adjw = (adjh * 600) / 400;
            xoff = (width - adjw) / 2 + 20;
        } else {
            adjh = adjw / 600 * 400;
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
            push();
            noStroke();
            fill(200);
            translate(scaleFactors.xoff, scaleFactors.yoff);;
            scale(scaleFactors.adjw / 600, scaleFactors.adjh / 400);;
            //all menu items displayed on scale of 600 to 400
            rect(0, 0, 600, 400);
            let img = assets.images.portal[5];
            img.resize(40, 40);
            image(img, 10, 10);
            fill(0)
            pop();
        }
    }
    isActive() {
        return this.active
    }
    mouseClicked() {
        let mousepos = this.getProjectedMousePosition();
        if(mousepos.x > 10 && mousepos.x < 50 && mousepos.y > 10 && mousepos.y < 50){
            this.active = false;
        }
    }
    getProjectedMousePosition() {
        let scaleFactors = this.getScaleFactors();
        let tempMouseX = mouseX;
        let tempMouseY = mouseY;
        tempMouseX -= scaleFactors.xoff;
        tempMouseY -= scaleFactors.yoff;
        tempMouseX /= scaleFactors.adjw / 600
        tempMouseY /= scaleFactors.adjh / 400
        return {
            x: tempMouseX,
            y: tempMouseY
        }
    }
}