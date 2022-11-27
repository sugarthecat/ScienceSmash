class Tutorial{
    constructor(){
        this.textbox = new TextBox([{content: "Uh oh... this isn't my", color: {r:255, g:255, b:255}},
        {content: "college dorm...", color: {r:0, g:200, b:0}},
        {content: "(", color: {r:255, g:255, b:255}},
        {content: "space", color: {r:200, g:0, b:0}},
        {content: "to continue )", color: {r:255, g:255, b:255}},
        ],1.5);
        this.phase = 0
        this.maxPhase = 52
        this.keypressStart
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
        if(this.phase < this.maxPhase){
            this.phase++;
        }
        if(this.phase == 1){
            this.textbox = new TextBox([{content: "I remember I went to sleep... How did I end up in this ", color: {r:255, g:255, b:255}},
            {content: "creepy dungeon?", color: {r:0, g:200, b:0}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "space", color: {r:200, g:0, b:0}},
            {content: "to continue )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
        if(this.phase == 2){
            this.textbox = new TextBox([{content: "At least I didn't miss much important studying. Can't fail a test anymore in this strange place", color: {r:255, g:255, b:255}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "space", color: {r:200, g:0, b:0}},
            {content: "to continue )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
        if(this.phase == 3){
            this.textbox = new TextBox([{content: "I should still do something... I think I'll move around a bit.", color: {r:255, g:255, b:255}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "W", color: {r:200, g:0, b:0}},
            {content: "to move upwards )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
        if(this.phase == 4){
            this.textbox = new TextBox([{content: "I still feel like I'm sleepwalking. Maybe if I go some other way...", color: {r:255, g:255, b:255}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "S", color: {r:200, g:0, b:0}},
            {content: "to move downwards )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
        if(this.phase == 5){
            this.textbox = new TextBox([{content: "A little better. I should go over here, though.", color: {r:255, g:255, b:255}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "A", color: {r:200, g:0, b:0}},
            {content: "to move leftwards )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
        if(this.phase == 6){
            this.textbox = new TextBox([{content: "That's it! I still want to check out that other corner, though.", color: {r:255, g:255, b:255}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "D", color: {r:200, g:0, b:0}},
            {content: "to move rightwards )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
        if(this.phase == 7){
            this.textbox = new TextBox([{content: "Wow! I feel", color: {r:255, g:255, b:255}},
            {content: "energized", color: {r:0, g:200, b:0}},
            {content: ". I think i'll try to run around", color: {r:255, g:255, b:255}},
            {content: "(", color: {r:255, g:255, b:255}},
            {content: "Shift", color: {r:200, g:0, b:0}},
            {content: "while", color: {r:255, g:255, b:255}},
            {content: "moving", color: {r:200, g:0, b:0}},
            {content: "to dash )", color: {r:255, g:255, b:255}},
            ],1.5);
        }
    }
}