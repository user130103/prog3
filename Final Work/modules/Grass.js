var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassHashiv++;
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0; 
        }
    }
}