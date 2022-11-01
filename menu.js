class Menu {
    constructor() {
        this.active = false;
    }
    invertActive(){
        this.active = !this.active
    }
    display(){
        if(this.active){
            push ()
            //6 wide: 4 tall ratio, with 20px padding on any side
            let adjh = height // adjusted height for calculations
            let adjw = width // adjusted height for calculations
            if(adjh/400 < adjw/600 ){
                adjw = adjh*600/400
            }else{
                adjh = adjw/600*400
            }
            adjw-= 40
            adjh -=40
            rectMode(CENTER)
            noStroke()
            fill (200)
            rect(width/2,height/2,adjw,adjh)
            pop ()
        }
    }
}