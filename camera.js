class Camera{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    target(target){
        // target is player
        let desx = target.x + target.w/2  // destination x
        let desy = target.y + target.h/2  // destination y
        //account for rotation of isometric perspective
        let desdir = atan2(desx,desy)
        desdir -= 45
        let desdist = dist(0,0,desx,desy)
        desx = sin(desdir)*desdist
        desy = cos(desdir)*desdist*0.8
        //center in middle of screen
        desx -= width/2
        desy -= height/2
        let diffx = (this.x-desx)/width; // difference x
        let diffy = (this.y - desy)/height; // difference x
        // the further away, the fa
        if(diffx != 0){
            this.x -= (diffx* diffx * (diffx/abs(diffx)))*width/20 
        }
        if(diffy != 0){
          this.y -= diffy* diffy * (diffy/abs(diffy))*height/20
        }
        //console.log(this.x + "," + desx + ",")
        translate(-this.x,-this.y)
    }
}