class TextBox{
    constructor(text,textSpeed){
        this.text = []
        this.textSpeed = textSpeed
        this.totalShown = 0;
        for(let i = 0; i<text.length; i++){
            if(text[i].content.includes(" ")){
                let splitParts = text[i].content.split(' ')
                for(let j = 0; j<splitParts.length; j++){
                    if(splitParts[j].length > 0){
                        this.text.push({content: splitParts[j], color: text[i].color})
                    }
                }
            }else{
                this.text.push(text[i])
            }
        }
    }
    display(){
        let xWidth = min(width-20,height)
        let yWidth = min(width/3,height/5)
        noStroke()
        fill (255)
        rect((width-xWidth)/2,height-yWidth,xWidth,yWidth)
        textSize(min((xWidth-20)/3,(yWidth-20)/3))
        fill(0)
        let rowOn = 1;
        let xOn = 0;
        let lettersTyped = 0
        for(let i = 0; i<this.text.length; i++){
            if(xOn + textWidth(this.text[i].content) > xWidth-10){
                rowOn++;
                xOn = 0;
            }
            for(let j = 0; j<this.text[i].content.length; j++){
                if(lettersTyped < this.totalShown){
                    fill(this.text[i].color.r,this.text[i].color.g,this.text[i].color.b)
                    text(this.text[i].content.charAt(j),(width-xWidth)/2+10+xOn,height-yWidth+textSize()*rowOn)
                    xOn += textWidth(this.text[i].content.charAt(j))
                    lettersTyped++;
                }
            }
            xOn += textWidth(" ")
        }
    }
    advanceText(){
        this.totalShown += this.textSpeed*deltaTime/100
    }
}