function setup() {

    var socket = io();

    var side = 20;

    var matrix = [];


    var grassCountElement = document.getElementById('grassCount');
    var grassEaterCountElement = document.getElementById('grassEaterCount');



    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        matrix = data.matrix;
        season = data.weather;
        console.log(season)
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');
        

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                rect(j * side, i * side, side, side);
                if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 1) {
                    if (season == "winter") {
                        fill("white")
                    }
                    else if (season == "spring") {
                        fill("lightgreen")
                    }
                    else if (season == "summer") {
                        fill("green")
                    }
                    else if (season == "autumn") {
                        fill("yellow")
                    }
                } else if (matrix[i][j] == 2) {
                    if (season == "winter") {
                        fill("lightyellow")
                    }
                    else if (season == "spring") {
                        fill("#babc54")
                    }
                    else if (season == "summer") {
                        fill("yellow")
                    }
                    else if (season == "autumn") {
                        fill("orange")
                    }
                } else if (matrix[i][j] == 3) {
                    if (season == "winter") {
                        fill("pink")
                    }
                    else if (season == "spring") {
                        fill("#d37d70")
                    }
                    else if (season == "summer") {
                        fill("red")
                    }
                    else if (season == "autumn") {
                        fill("#681205")
                    }
                } else if (matrix[i][j] == 4) {
                    if (season == "winter") {
                        fill("lightblue")
                    }
                    else if (season == "spring") {
                        fill("#9cbbed")
                    }
                    else if (season == "summer") {
                        fill("blue")
                    }
                    else if (season == "autumn") {
                        fill("#05265b")
                    }
                } else if (matrix[i][j] == 5) {
                    if (season == "winter") {
                        fill("#cecaca")
                    }
                    else if (season == "spring") {
                        fill("#grey")
                    }
                    else if (season == "summer") {
                        fill("black")
                    }
                    else if (season == "autumn") {
                        fill("#969696")
                    }
                }
            }
        }
    }
}

function spanel() {
    socket.emit("spanel");
}