class ColorText{
    constructor(textColor, text){
        this.color = color(textColor)
        this.content = text
    }
}
class Tutorial{
    constructor(blurbText){
        this.textBoxes = []
        let blurbs = blurbText.split('\n')
    
        for(let i = 0; i<blurbs.length; i++){
            blurbs[i] = new ColorText('white',blurbs[i])
        }
        for(let i = 0; i<blurbs.length; i++){
            this.textBoxes.push(new TextBox([blurbs[i]],1.5))
        }
        this.textbox = this.textBoxes[0]
        this.phase = 0
    }
    isComplete(){
        return this.phase == this.maxPhase;
    }
    advanceText(){
        this.textbox.advanceText();
    }
    display(){
        this.textbox.display();
    }
    takeInput(key){
        if(key == 32 && this.phase <= 2 && this.textbox.isComplete()){
            this.advancePhase();
        }
    }
    testLevel(){
        if(this.textbox.isComplete()){
            if(this.phase == 3 && level.player.isMovingUp()){
                this.advancePhase();
            }
            else if(this.phase == 4 && level.player.isMovingDown()){
                this.advancePhase();
            }
            else if(this.phase == 5 && level.player.isMovingLeft()){
                this.advancePhase();
            }
            else if(this.phase == 6 && level.player.isMovingRight()){
                this.advancePhase();
            }
        }
    }
    advancePhase(){
        if(this.phase + 1 < this.textBoxes.length){
            this.phase++;
            this.textbox = this.textBoxes[this.phase]
        }
    }
}