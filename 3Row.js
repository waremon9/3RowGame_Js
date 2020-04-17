//Variables
var gridHeight = 74;
var gridWidth = 140;
var cellSize = 10;
var nbColor = 3;
var gameSpeed = 5;

//cells content
var EMPTY = 0;
var DOT_BLUE = 1;
var DOT_GREEN = 2;
var DOT_YELLOW = 3;
var DOT_RED = 4;
var DOT_VIOLET = 5;

//color
var BLUE = "#0000FF";
var GREEN = "#00FF00";
var YELLOW = "#FFFF00";
var RED = "#FF0000";
var VIOLET = "#7F00FF";
var BLACK = "#000000";
var LIGHT_GREY = "rgba(200, 200, 200, 0.3)";

//game state
var GameState = [];
var col=[];
for(let i = 0; i<gridWidth; i++){
    col = [];
    for(let j = 0; j<gridHeight;j++){
        let rnd = Math.floor(Math.random() * (nbColor) + 1)
        col.push(rnd);
    }
    GameState.push(col);
}
var toDelete = [];

// wait for window to load
window.onload = function(){
    createCanvas();
}

function createCanvas(){
    let width = gridWidth * cellSize;
    let height = gridHeight * cellSize;
    let can =  "<canvas id='myCanvas' width='"+ width
        + "' height='"+ height +"'></canvas>";
    document.getElementById("game").innerHTML = can;
    drawBoard();
}

function drawBoard(){
    // Draw the whole game on the canvas
  
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
  
    //erase
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Define useful variable.
    canHeight = canvas.height;
    canWidth = canvas.width;

    //coloring cells acording to what they contain
    for(let x = 0; x<gridWidth; x++){
        for(let y = 0; y<gridHeight; y++){
            switch(GameState[x][y]){
                case EMPTY:
                    ctx.fillStyle = LIGHT_GREY;
                    break;
                case DOT_BLUE:
                    ctx.fillStyle = BLUE;
                    break;
                case DOT_GREEN:
                    ctx.fillStyle = GREEN;
                    break;
                case DOT_YELLOW:
                    ctx.fillStyle = YELLOW;
                    break;
                case DOT_RED:
                    ctx.fillStyle = RED;
                    break;
                case DOT_VIOLET:
                    ctx.fillStyle = VIOLET;
                    break;
                default:
                    console.log(x+","+y);
                    console.log("ERROR in drawBoard()")
                    break;
            }
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
        }
    }

    //draw the grid
    ctx.beginPath();
    ctx.strokeStyle = BLACK;
    for(let x = 0; x<gridWidth+1; x++){
      ctx.moveTo(cellSize*x,0);
      ctx.lineTo(cellSize*x,canHeight);
    }
    for(let y = 0; y<gridHeight+1; y++){
      ctx.moveTo(0,cellSize*y);
      ctx.lineTo(canWidth,cellSize*y);
    }
    ctx.stroke();
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        boucle();
    }
})


function checkAllGrid(){
    let count = 0;
    for(let x = 0; x<gridWidth; x++){
        for(let y = 0; y<gridHeight; y++){
            count = check3row(x,y,0);
            if(count>=2) for(let i = 0; i<=count; i++) toDelete.push([x+i,y]);
            count = check3col(x,y,0);
            if(count>=2) for(let i = 0; i<=count; i++) toDelete.push([x,y+i]);
        }
    }
    deleteFromGrid();
}

function check3row(x, y, count){
    if(x<gridWidth-1 && GameState[x][y] == GameState[x+1][y]){
        count = check3row(x+1,y,count+1)
    }
    return count
}

function check3col(x, y, count){
    if(y<gridHeight-1 && GameState[x][y] == GameState[x][y+1]){
        count = check3col(x,y+1,count+1)
    }
    return count
}

function deleteFromGrid(){
    if(toDelete.length != 0){
        toDelete.forEach(e => {
            GameState[e[0]][e[1]] = EMPTY;
        });
        toDelete = [];
        setTimeout(boucle, gameSpeed*1.5);
    }
    drawBoard();
}


function fillTopRow(){
    for(let i = 0; i<gridWidth;i++){
        if(GameState[i][0] == EMPTY) GameState[i][0] = Math.floor(Math.random() * (nbColor) + 1);
    }
}


function gravity(){
    GameState.forEach(col => {
        for(let i = gridHeight-1; i>0; i--){
            if(col[i] == EMPTY){
                col[i] = col[i-1];
                col[i-1] = EMPTY;
            }
        }
    });
}

function boucle(){
    if(!checkGridFull()){
        gravity();
        fillTopRow();
        drawBoard();
        setTimeout(boucle, gameSpeed);
    }else{
        setTimeout(checkAllGrid, gameSpeed*2);
    }
}

function checkGridFull(){
    let res = true;
    GameState.forEach(col => {
        col.forEach(cell => {
            if(cell == EMPTY){
                res = false;
            }
        })
    });
    return res;
}