var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Human = require("./modules/Human.js");
var Death = require("./modules/Death.js");
var random = require('./modules/random');


grassArr = [];
grassEaterArr = [];
predatorArr = [];
humanArr = [];
deathArr = [];

matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
humanHashiv = 0;
deathHashiv = 0;



function matrixGenerator(matrixSize, grass, grassEater, predator, human, death) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); 
        let customY = Math.floor(random(matrixSize)); 
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < human; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < death; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}

matrixGenerator(35, 50, 20, 20, 20, 30);


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var human = new Human(x, y);
                humanArr.push(human);
                humanHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var death = new Death(x, y);
                deathArr.push(death);
                deathHashiv++;
            }
        }
    }
}
creatingObjects();

var season = 0
weatheris = "winter";


function changeWeather() {
    season++;
    if (season > 0 && season < 6) {
        weatheris = "winter";
    }
    else if (season >= 6 && season < 12) {
        weatheris = "spring";
    }
    else if (season >= 12 && season < 18) {
        weatheris = "summer";
    }
    else if (season >= 18 && season < 24) {
        weatheris = "autumn";
    }
    else {
        season = 0;
    }

}


function game() {

    changeWeather();
    console.log(weatheris);
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        humanCounter : humanHashiv,
        deathCounter : deathHashiv,
        weather: weatheris
    }
    
    io.sockets.emit("data", sendData);

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].move();
            predatorArr[i].eat();
            predatorArr[i].mul();
        }
    }
    if (humanArr[0] !== undefined) {
        for (var i in humanArr) {
            humanArr[i].move();
            humanArr[i].eat();
            humanArr[i].mul();
        }
    }
    if (deathArr[0] !== undefined) {
        for (var i in deathArr) {
            deathArr[i].move();
            deathArr[i].eat();
            deathArr[i].mul();
        }
    }

    
}


setInterval(game, 1000)