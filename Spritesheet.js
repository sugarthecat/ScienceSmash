class SpriteSheet{
    jsonLoaded = false;
    imageLoaded = false;
    image = null;
    json = null;
    sprites = []
    constructor(address,finishedLoad){
        this.finishedLoadFunction = finishedLoad
        let localReference = this
        this.image = loadImage(address,function(){localReference.finishedLoadingImage()})
        let addressParts = address.split('.')
        addressParts.pop();
        let jsonAddress = addressParts.join('.') + '.json'
        this.json = loadJSON(jsonAddress,function(){localReference.finishedLoadingJSON()})
    }
    finishedLoadingJSON(){
        this.jsonLoaded = true;
        if(this.imageLoaded){
            this.finishedLoadFunction();
            this.parseSprites();
        }
    }
    finishedLoadingImage(){
        this.imageLoaded = true;
        if(this.jsonLoaded){
            this.finishedLoadFunction();
            this.parseSprites();
        }
    }
    isLoaded(){
        return this.jsonLoaded && this.imageLoaded;
    }
    parseSprites(){
        console.log(this)
        this.sprites = this.json.frames
        for(let i = 0; i<this.sprites.length; i++){
            this.sprites[i] = this.image.get(
                this.sprites[i].frame.x,
                this.sprites[i].frame.y,
                this.sprites[i].frame.w,
                this.sprites[i].frame.h)
        }
        console.log(this)
    }
    getSprite(index){
        return this.sprites[index]
    }
    getLength(){
        return this.sprites.length;
    }
}