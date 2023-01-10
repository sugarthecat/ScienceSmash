class ColorText {
    constructor(text, r, g, b) {
        this.color = color(r, g, b)
        this.content = text
        this.hasAfterSpace = false;
    }
    addAfterSpace() {
        this.hasAfterSpace = true;
    }
}