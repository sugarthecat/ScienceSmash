class Camera{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    target(target){
        
        let desx = target.x + target.w/2 - windowWidth/2
        let desy = target.y + target.h/2 - windowHeight/2
        let diffx = (this.x-desx)/width;
        let diffy = (this.y - desy)/height;
        if(diffx != 0){
            this.x -= (diffx* diffx * (diffx/abs(diffx)))*width/4
        }
        
        if(diffy != 0){
          this.y -= diffy* diffy * (diffy/abs(diffy))*height/4
        }
        //dconsole.log(this.x + "," + desx + ",")
        translate(-this.x,-this.y)
    }
}