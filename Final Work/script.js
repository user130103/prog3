function setup() {

    var socket = io();

    var side = 20;

    var matrix = [];

   
    var grassCountElement = document.getElementById('grassCount');
    var grassEaterCountElement = document.getElementById('grassEaterCount');
    var predatorCountElement = document.getElementById('grassEaterCount');

   
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        matrix = data.matrix;
        season = data.weather;
        console.log(season)
        grassCountElement.innerText = data.grassCounter; 
        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');
        
        
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 1) {
                    if(season == "winter"){
                        fill("white")
                    }
                    else{
                        fill("green")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    if(season == "winter"){
                        fill("lightyellow")
                    }
                    else{
                        fill("yellow")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    if(season == "winter"){
                        fill("pink")
                    }
                    else{
                        fill("red")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    if(season == "winter"){
                        fill("lightblue")
                    }
                    else{
                        fill("blue")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    if(season == "winter"){
                        fill("grey")
                    }
                    else{
                        fill("black")
                    }
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

function spanel(){
    socket.emit("spanel");
}