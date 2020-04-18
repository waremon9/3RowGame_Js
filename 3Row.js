//Variables
var gridHeight = 15;
var gridWidth = 15;
var cellSize = 40;
var nbColor = 5;
var gameSpeed = 60;

//cells content
var EMPTY = 0;
var DOT_BLUE = 1;
var DOT_GREEN = 2;
var DOT_YELLOW = 3;
var DOT_RED = 4;
var DOT_PURPLE = 5;
var DOT_CYAN = 6;
var DOT_PINK = 7;

//color (some unused with the image coming)
var BLUE = "#0000FF";
var GREEN = "#00FF00";
var YELLOW = "#FFFF00";
var RED = "#FF0000";
var PURPLE = "#7F00FF";
var BLACK = "#000000";
var ORANGE = "#FFA500";
var LIGHT_GREY = "rgba(200, 200, 200, 0.3)";

//images
var img_Blue = new Image();
img_Blue.src = "Image/BluePuyo.png";
var img_Green = new Image();
img_Green.src = "Image/GreenPuyo.png";
var img_Red = new Image();
img_Red.src = "Image/RedPuyo.png";
var img_Yellow = new Image();
img_Yellow.src = "Image/YellowPuyo.png";
var img_Purple = new Image();
img_Purple.src = "Image/PurplePuyo.png";
var img_Cyan = new Image();
img_Cyan.src = "Image/CyanPuyo.png";
var img_Pink = new Image();
img_Pink.src = "Image/PinkPuyo.png";

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
var SelectedCell = null;

// wait for window to load
window.onload = function(){
    createCanvas();
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        boucle();
    }
})

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function createCanvas(){
    let width = gridWidth * cellSize;
    let height = gridHeight * cellSize;
    let can =  "<canvas id='myCanvas' width='"+ width
        + "' height='"+ height +"'></canvas>";
    document.getElementById("game").innerHTML = can;

    document.getElementById("myCanvas").addEventListener('click', function(event){
        let pos = getMousePos(document.getElementById("myCanvas"), event);
        selectCell(pos);
    })

    drawBoard();
}

function selectCell(pos){
    let X = Math.floor(pos.x/cellSize);
    let Y = Math.floor(pos.y/cellSize);
    if(SelectedCell == null) SelectedCell = [X,Y];
    else {
        let tmp = GameState[X][Y];
        GameState[X][Y] = GameState[SelectedCell[0]][SelectedCell[1]];
        GameState[SelectedCell[0]][SelectedCell[1]] = tmp;
        SelectedCell = null;
    }
    drawBoard();
    setTimeout(boucle, gameSpeed*2);
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
            ctx.fillStyle = LIGHT_GREY;
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
            switch(GameState[x][y]){
                case EMPTY:
                    //do nothing
                    break;
                case DOT_BLUE:
                    ctx.drawImage(img_Blue, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                case DOT_GREEN:
                    ctx.drawImage(img_Green, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                case DOT_YELLOW:
                    ctx.drawImage(img_Yellow, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                case DOT_RED:
                    ctx.drawImage(img_Red, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                case DOT_PURPLE:
                    ctx.drawImage(img_Purple, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                case DOT_CYAN:
                    ctx.drawImage(img_Cyan, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                case DOT_PINK:
                    ctx.drawImage(img_Pink, x*cellSize, y*cellSize, cellSize, cellSize);
                    break;
                default:
                    console.log(x+","+y);
                    console.log("ERROR in drawBoard()")
                    break;
            }
            
        }
    }

    //draw the grid
    ctx.beginPath();
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = 1;
    for(let x = 0; x<gridWidth+1; x++){
      ctx.moveTo(cellSize*x,0);
      ctx.lineTo(cellSize*x,canHeight);
    }
    for(let y = 0; y<gridHeight+1; y++){
      ctx.moveTo(0,cellSize*y);
      ctx.lineTo(canWidth,cellSize*y);
    }
    ctx.stroke();

    //show selected cell
    if(SelectedCell != null){
        ctx.beginPath();
        ctx.strokeStyle = ORANGE;
        ctx.lineWidth = 4;
        ctx.moveTo(SelectedCell[0]*cellSize, SelectedCell[1]*cellSize);
        ctx.lineTo((SelectedCell[0]+1)*cellSize, SelectedCell[1]*cellSize);
        ctx.lineTo((SelectedCell[0]+1)*cellSize, (SelectedCell[1]+1)*cellSize);
        ctx.lineTo(SelectedCell[0]*cellSize, (SelectedCell[1]+1)*cellSize);
        ctx.lineTo(SelectedCell[0]*cellSize, SelectedCell[1]*cellSize);
        ctx.stroke();
    }

}



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