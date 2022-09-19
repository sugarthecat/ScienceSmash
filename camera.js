class Camera{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    target(target){
        // target is player
        let desx = target.x + target.w/2 - windowWidth/2 // destination x
        let desy = target.y + target.h/2 - windowHeight/2 // destination x
        let diffx = (this.x-desx)/width; // difference x
        let diffy = (this.y - desy)/height; // difference x
        // the further away, the fa
        if(diffx != 0){
            this.x -= (diffx* diffx * (diffx/abs(diffx)))*width/20 
        }
        if(diffy != 0){
          this.y -= diffy* diffy * (diffy/abs(diffy))*height/20
        }
        //dconsole.log(this.x + "," + desx + ",")
        translate(-this.x,-this.y)
    }
}