class Tile{
    constructor(img){
        this.x = 0
        this.y = 0
        this.w = 100
        this.h = 100
        this.img = img
        this.hasUpper = false
        this.hasGround = true
    }
    displayGround(){
        image(this.img,this.x,this.y,this.w,this.h)
    }
    collides(a){
        return false
    }
}