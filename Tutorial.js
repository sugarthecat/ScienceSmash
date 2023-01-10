
class Tutorial {
    constructor(blurbText) {
        this.textBoxes = [];
        let blurbs = blurbText.split('\n');
        for (let i = 0; i < blurbs.length; i++) {
            this.textBoxes.push(new TextBox(blurbs[i], 15));
        }
        this.textbox = this.textBoxes[0];
        this.phase = 0;

    }
    isComplete() {
        return this.phase == this.textBoxes.length;
    }
    advanceText() {
        this.textbox.advanceText();
    }
    draw() {
        this.textbox.draw();
    }
    complete(){
        this.phase = this.textBoxes.length;
    }
    takeInput(key) {
        if (key == 32) {
            if (this.textbox.isComplete() &&
                (this.phase <= 2
                    || (this.phase >= 9 && this.phase <= 10)
                    || (this.phase >= 12 && this.phase <= 16)
                    || (this.phase == 18))) {
                this.advancePhase();
            } else {
                this.textbox.advanceText(true);
            }
        }
    }
    testLevel() {
        if (this.textbox.isComplete()) {
            if (this.phase == 3 && level.player.isMovingDown()) {
                this.advancePhase();
            }
            else if (this.phase == 4 && level.player.isMovingUp()) {
                this.advancePhase();
            }
            else if (this.phase == 5 && level.player.isMovingLeft()) {
                this.advancePhase();
            }
            else if (this.phase == 6 && level.player.isMovingRight()) {
                this.advancePhase();
            }
            else if (this.phase == 7 && level.player.dashTimer > 0) {
                this.advancePhase();
            }
            else if (this.phase == 17 && level.entities.length == 0) {
                this.advancePhase();
            }
        }
    }
    advancePhase() {
        if (this.phase < this.textBoxes.length) {
            this.phase++;
            this.textbox = this.textBoxes[this.phase];
            if (this.phase == 17) {
                level.spawnTutorialEnemy();
            }
            if (this.phase == 19) {
                level.openTutorialCorridor();
            }
        }
    }
}