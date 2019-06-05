class Death extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 7;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {

        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var newCells = newCell1.concat(newCell2);
        var newCell = random(newCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 1) {

                this.oldX = newX;
                this.oldY = newY;
                this.grass = true;

                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                if (this.grass) {
                    matrix[this.y][this.x] = 1;
                }
                else {
                    matrix[this.y][this.x] = 0;
                    matrix[newY][newX] = 4;

                    this.y = newY;
                    this.x = newX;
                    this.grassMake();

                }


                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;

                this.y = newY;
                this.x = newX;
                this.energy -= 3;

            }
        }
    }

            eat() {


                var newCell1 = this.chooseCell(3);
                var newCell2 = this.chooseCell(4);
                var newCells = newCell1.concat(newCell2);
                var newCell = random(newCells);

                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];

                    matrix[this.y][this.x] = 0;
                    matrix[newY][newX] = this.index;
                    if (matrix[newY][newX] == 4) {
                        for (var i in humanArr) {
                            if (newX == humanArr[i].x && newY == humanArr[i].y) {
                                humanArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[newY][newX] == 3) {
                        for (var i in predatorArr) {
                            if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                                predatorArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    this.y = newY;
                    this.x = newX;
                    this.energy += 4;

                }
            }

            mul() {

                var newCell = random(this.chooseCell(0));

                if (this.energy >= 60 && newCell) {
                    var newHuman = new Human(newCell[0], newCell[1], this.index);
                    humanArr.push(newHuman);
                    matrix[newCell[1]][newCell[0]] = 5;
                    this.energy = 12;
                }
            }



            die() {

                if (this.energy <= 0) {
                    matrix[this.y][this.x] = 0;
                    for (var i in deathArr) {
                        if (this.x == deathArr[i].x && this.y == deathArr[i].y) {
                            deathArr.splice(i, 1);
                            break;
                        }
                    }
                }
            }
}