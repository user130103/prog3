var matrix = [];
var n = 40;
var m = 50;
var side = 12;



var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var humanArr = [];
var deathArr = [];
var characters = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 2, 2, 3, 3, 3, 4, 5]

function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            matrix[y][x] = random(characters);
        }
    }


    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);

            }
            else if (matrix[y][x] == 4) {
                var hu = new Human(x, y, 4);
                humanArr.push(hu);

            }
            else if (matrix[y][x] == 5) {
                var de = new Death(x, y, 5);
                deathArr.push(de);

            }
        }
    }

}

function draw() {
    console.log()
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }



        }
    }
    console.log(grassArr.length)
    for (var i in grassArr) {
        grassArr[i].mul();

    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();

    }


    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }



    for (var i in humanArr) {
        humanArr[i].move();
        humanArr[i].eat();
        humanArr[i].mul();
        humanArr[i].die();

    }

    
    for (var i in deathArr) {
            deathArr[i].move();
            deathArr[i].eat();
            deathArr[i].mul();
            deathArr[i].die();
        }
    
}

