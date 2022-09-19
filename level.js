class Level{
    constructor(){
        this.elements = []
    }
    display(){
        for(let i = 0; i<this.elements.length; i++){
            this.elements[i].display()
        }
    }
}