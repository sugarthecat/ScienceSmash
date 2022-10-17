let levelGrid = [99,99];
let rnd = [standard, standard, standard, standard, standard, standard, standard, standard, loot, shop];

// LVL = int of level (lvl 9, lvl 12, etc)
// DFB = int of amount of defeated bosses
function generateLevel(LVL, DFB) {
    for (let i = 0; i < 99; i++) { for (let j = 0; j < 99; j++) { levelGrid[i,j] = empty }} // Resets the level to be empty.
    levelGrid[50,50] = initial; // Sets the center of the level grid to the initial spawning room.
    // Creates the remaining rooms of the level.
    for (let i = 0; i < (2*DFB) + 2; i++) {
        let room = levelGrid[random(levelGrid[])];
        if (room )
        // room = random(rnd)

        // Makes the last room to spawn a progression/boss room.
        if (i = (2*DFB) + 1) {
            if (LVL = 10) {
                // room = boss room
            } else {
                // room = progression room
            }
        }
    }
}