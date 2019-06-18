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
matrixGenerator(20, 10, 20, 30, 40, 50);


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
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var human = new Human(x, y);
                humanArr.push(human);
            }
            else if (matrix[y][x] == 5) {
                var death = new Death(x, y);
                deathArr.push(death);
            }
        }
    }
}
creatingObjects();

var season = 0
weatheris = "winter";

var sendData = {
    matrix: matrix,
    grassCounter: grassHashiv,
    grassEaterCountElement: grassEaterHashiv,
    weather: weatheris,

}

function changeWeather() {
    season++
    if (season > 0 && season < 6) {
        sendData.weather = "winter";
    }
    else if (season >= 6 && season < 12) {
        sendData.weather = "summer";
    }
    else {
        season = 0;
    }
    
}


function game() {

    changeWeather();
    console.log(weatheris);

    console.log(sendData.weather);
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
            grassEaterArr[i].die();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].move();
            predatorArr[i].eat();
            predatorArr[i].mul();
            predatorArr[i].die();
        }
    }
    if (humanArr[0] !== undefined) {
        for (var i in humanArr) {
            humanArr[i].move();
            humanArr[i].eat();
            humanArr[i].mul();
            humanArr[i].die();
        }
    }
    if (deathArr[0] !== undefined) {
        for (var i in deathArr) {
            deathArr[i].move();
            deathArr[i].eat();
            deathArr[i].mul();
            deathArr[i].die();
        }
    }
}






setInterval(game, 1000)


function mah() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            matrix[y][x] = 0
        }
    }

    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    humanArr = [];
    deathArr = [];
}

io.on('connection', function (socket) {
    socket.on("spanel", mah)
});

