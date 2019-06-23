function setup() {

    var socket = io();

    var side = 20;

    var matrix = [];

 
    var grassCountElement = document.getElementById('grassCount');
    var grassEaterCountElement = document.getElementById('grassEaterCount');
    var predatorCountElement = document.getElementById('predatorCount');
    var humanCountElement = document.getElementById('humanCount');
    var deathCountElement = document.getElementById('deathCount');
    var heading = document.getElementById('heading');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        matrix = data.matrix;
        season = data.weather;
        console.log(season)

        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        humanCountElement.innerText = data.humanCounter;
        deathCountElement.innerText = data.deathCounter;
        heading.innerText = data.weather;

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
                        document.body.style.backgroundColor = "lightblue"
                    }
                    else if (season == "spring") {
                        fill("lightgreen")
                        document.body.style.backgroundColor = "lightgreen"
                    }
                    else if (season == "summer") {
                        fill("green")
                        document.body.style.backgroundColor = "pink"
                    }
                    else if (season == "autumn") {
                        fill("orange")
                        document.body.style.backgroundColor = "lightyellow"
                    }
                    
                } else if (matrix[i][j] == 2) {
                    if (season == "winter") {
                        fill("lightyellow")
                        document.body.style.backgroundColor = "lightblue"
                    }
                    else if (season == "spring") {
                        fill("#babc54")
                        document.body.style.backgroundColor = "lightgreen"
                    }
                    else if (season == "summer") {
                        fill("yellow")
                        document.body.style.backgroundColor = "pink"
                    }
                    else if (season == "autumn") {
                        fill("orange")
                        document.body.style.backgroundColor = "lightyellow"
                    }
                    fill('yellow')
                    rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 3) {
                    if (season == "winter") {
                        fill("pink")
                        document.body.style.backgroundColor = "lightblue"
                    }
                    else if (season == "spring") {
                        fill("#d37d70")
                        document.body.style.backgroundColor = "lightgreen"
                    }
                    else if (season == "summer") {
                        fill("red")
                        document.body.style.backgroundColor = "pink"
                    }
                    else if (season == "autumn") {
                        fill("#681205")
                        document.body.style.backgroundColor = "lightyellow"
                    }
                    
                   rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 4) {
                    if (season == "winter") {
                        fill("lightblue")
                        document.body.style.backgroundColor = "lightblue"
                    }
                    else if (season == "spring") {
                        fill("#9cbbed")
                        document.body.style.backgroundColor = "lightgreen"
                    }
                    else if (season == "summer") {
                        fill("blue")
                        document.body.style.backgroundColor = "pink"
                    }
                    else if (season == "autumn") {
                        fill("#05265b")
                        document.body.style.backgroundColor = "lightyellow"
                    }
                   
                    rect(j * side, i * side, side, side);
                    
                } else if (matrix[i][j] == 5) {
                    if (season == "winter") {
                        fill("#cecaca")
                        document.body.style.backgroundColor = "lightblue"
                    }
                    else if (season == "spring") {
                        fill("#grey")
                        document.body.style.backgroundColor = "lightgreen"
                    }
                    else if (season == "summer") {
                        fill("black")
                        document.body.style.backgroundColor = "pink"
                    }
                    else if (season == "autumn") {
                        fill("#969696")
                        document.body.style.backgroundColor = "lightyellow"
                    }
                    
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}