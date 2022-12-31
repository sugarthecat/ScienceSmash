class GameMenu {
    constructor() {
        this.active = false;
    }
    invertActive() {
        this.active = !this.active;
    }
    display() {
        if (this.active) {
            push();
            //6 wide: 4 tall ratio, with 20px padding on any side
            let adjh = height; // adjusted height for calculations
            let adjw = width; // adjusted height for calculations
            let xoff = 20;
            let yoff = 20;
            if (adjh/400 < adjw/600 ) {
                adjw = (adjh*600)/400;
                xoff = (width-adjw)/(2+20);
            } else {
                adjh = adjw/600*400;
                yoff = (height-adjh)/2+20;
            }
            adjw -= 40;
            adjh -= 40;
            noStroke();
            fill (200);
            translate (xoff,yoff);;
            scale(adjw/600,adjh/400);;
            //all menu items displayed on scale of 600 to 400
            rect(0,0,600,400);
            let img = assets.images.portal[5];
            img.resize(40,40);
            image(img, 10, 10);
            pop();
        }
    }
}