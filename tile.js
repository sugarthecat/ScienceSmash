class Tile{
    constructor(x,y,w,h,img){
        this.x =x
        this.y = y
        this.w = w
        this.h = h
        this.img = img
        this.hasUpper = false
        this.hasGround = true
    }
    displayGround(){
        if(dist(this.x,this.y,player.x,player.y) < sqrt(width * width + height * height)){
            image(this.img,this.x,this.y,this.w,this.h)
        }
    }
    collides(a){
        return false
    }
}