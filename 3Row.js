//Variables
var gridHeight = 15;
var gridWidth = 15;
var spaceSize = 40;

//cells content
var EMPTY = 0;
var DOT_BLUE = 1;
var DOT_GREEN = 2;
var DOT_YELLOW = 3;
var DOT_RED = 4;

//color
var BLUE = "#0000FF";
var GREEN = "#00FF00";
var YELLOW = "#FFFF00";
var RED = "#FF0000";
var BLACK = "#000000";
var LIGHT_GREY = "rgba(200, 200, 200, 0.3)";

//game state
var GameState = [];
var line=[];
for(let i = 0; i<gridWidth; i++){
    line = [];
    for(let j = 0; j<gridHeight;j++){
        line.push(EMPTY);
    }
    GameState.push(line);
}

// wait for window to load
window.onload = function(){
    createCanvas();
}

function createCanvas(){
    let width = gridWidth * spaceSize;
    let height = gridHeight * spaceSize;
    let can =  "<canvas id='myCanvas' width='"+ width
        + "' height='"+ height +"'></canvas>";
    document.getElementById("game").innerHTML = can;
    drawBoard();
}

function drawBoard(){
    // Draw the whole game on the canvas
  
    let canvas = document.getElementById("myCanvas");
    console.log(canvas);
    let ctx = canvas.getContext("2d");
  
    //erase
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Define useful variable.
    canHeight = canvas.height;
    canWidth = canvas.width;
  
    ctx.fillStyle = LIGHT_GREY;
    ctx.fillRect(0, 0, spaceSize*gridWidth, spaceSize*gridHeight);

    //coloring cells acording to what they contain
    for(let x = 0; x<gridWidth; x++){
        for(let y = 0; y<gridHeight; y++){
            switch(GameState[x][y]){
                case EMPTY:
                    //already done
                    break;
                default:
                    break;
            }
        }
    }

    //draw the grid
    ctx.beginPath();
    ctx.strokeStyle = BLACK;
    for(let x = 0; x<gridWidth+1; x++){
      ctx.moveTo(spaceSize*x,0);
      ctx.lineTo(spaceSize*x,canHeight);
    }
    for(let y = 0; y<gridHeight+1; y++){
      ctx.moveTo(0,spaceSize*y);
      ctx.lineTo(canWidth,spaceSize*y);
    }
    ctx.stroke();
}