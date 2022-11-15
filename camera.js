class Camera {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.worldScale = 1;
    }
    getPositionAt(target){
        let desx = target.x + target.w/2;  // destination x
        let desy = target.y + target.h/2;  // destination y
        //account for rotation of isometric perspective
        let desdir = atan2(desx,desy);
        desdir -= 45;
        let desdist = dist(0,0,desx,desy);
        desx = sin(desdir)*desdist;
        desy = cos(desdir)*desdist*TILE_SCALE;
        //center in middle of screen
        desx-=width/2/this.worldScale;
        desy-=height/2/this.worldScale;
        return [desx,desy]
    }
    setPositionAs(target){
        // target is player
        let desx,desy
        [desx,desy] = this.getPositionAt(target) //JS equivalent of a tuple
        this.x = desx
        this.y = desy
    }
    scaleUp(scalefac,tgt){
        this.worldScale *= scalefac
        if(this.worldScale > 2){
            this.worldScale = 2
        }
        this.setPositionAs(tgt)
    }
    scaleDown(scalefac,tgt){
        this.worldScale /= scalefac
        if(this.worldScale < 0.3){
            this.worldScale = 0.3
        }
        this.setPositionAs(tgt)
    }
    moveTowards(target) {
        // target is player
        let desx,desy
        [desx,desy] = this.getPositionAt(target) //JS equivalent of a tuple
        let diffx = (this.x - desx)/width; // difference x
        let diffy = (this.y - desy)/height; // difference y
        // the further away, the faster the camera moves
        if (diffx != 0) {
            //if X difference, move camera towards desx
            this.x -= diffx*diffx * (diffx/abs(diffx))*width;
        }
        if (diffy != 0) {
            //if Y difference, move camera towards desy
          this.y -= diffy*diffy * (diffy/abs(diffy))*height;
        }
    }
    adjust() {
        scale(this.worldScale,this.worldScale);
        translate(-this.x,-this.y);
    }
}