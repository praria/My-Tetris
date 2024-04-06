const ROW = 20;
const COL = 10;
const SquareSize = 20;
const Vacant = "white"; // color of empty square

// add the tetris them song
const tetrisTheme = document.getElementById("tetris-theme");
const volumeControl = document.getElementById("volume-control");
const muteButton = document.getElementById("mute-button");

tetrisTheme.volume = volumeControl.value / 100;

// update volume on input change
volumeControl.addEventListener("input", function() {
    tetrisTheme.volume = volumeControl.value / 100;
}); 

// Toggle mute/ unmute on button click
muteButton.addEventListener("click", function(){
    if (tetrisTheme.paused) {
        tetrisTheme.play();
        muteButton.textContent = "Mute";
    }
    else {
        tetrisTheme.pause();
        muteButton.textContent = "Unmute";
    }
});

tetrisTheme.play();

const cnvs = document.getElementById("tetris");
cnvs.width = COL * SquareSize;
cnvs.height = ROW * SquareSize;

const cntx = cnvs.getContext("2d"); 
const scoreElement = document.getElementById("score");


// draw a square 
function drawSquare(x, y, color) {
    cntx.fillStyle = color;
    cntx.fillRect(x * SquareSize, y * SquareSize, SquareSize, SquareSize);

    cntx.strokeStyle = "black";
    cntx.strokeRect(x * SquareSize, y * SquareSize, SquareSize, SquareSize);
}

// drawSquare(0, 0, "red");

// create a board
let board = [];
for( r = 0; r < ROW; r++){
    board[r] = [];
    for( c = 0; c < COL; c++){
        board[r][c] = Vacant; // color
    }
}

// draw the board
function drawBoard(){
    // clear the canvas
    cntx.clearRect(0, 0, cnvs.width, cnvs.height);
    // render only the visible portion of the playfield ()
    for( r = 0; r < ROW; r++){
        for( c = 0; c < COL; c++){
            drawSquare(c, r, board[r][c])
        }
    }
}

drawBoard();

// the tetromino items and their colors
const ITEMS = [
    [Z, "red"],
    [S, "green"],
    [T, "purple"],
    [O, "yellow"],
    [L, "orange"],
    [I, "cyan"],
    [J, "blue"]
]; 

// generate the random items/ tetriminoes 
function randomItem(){
    let r = randomNum = Math.floor(Math.random() * ITEMS.length) // generates number fr0m 0 to 6
    return new item(ITEMS[r][0], ITEMS[r][1]);

}


// initiate the item
let p = new randomItem();

// the tetromino item construction function
function item(tetromino, color){
    this.tetromino = tetromino;
    this.color = color;

    this.tetroNum = 0; // starting from the first pattern
    this.activeTetromino = this.tetromino[this.tetroNum];

    // to control the items starting position
    if (this.tetromino === I || this.tetromino === O) {
        // for tetrominos I and O start in the middle column
        this.x = Math.floor(COL/2)-1;
    } 
    else {
        this.x = Math.floor(COL/2) - 2;
    }
    this.y = 0;
} 

// fill function 
item.prototype.fill = function(color){
    for(r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares (not empty)
            if(this.activeTetromino[r][c]){
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
} 

// draw a tetromino item to the board
item.prototype.draw = function(){
    this.fill(this.color); 
} 

//p.draw();

// undraw the tetromino/item
item.prototype.unDraw = function(){
    this.fill(Vacant);
} 

// MOVEMENT FUNCTIONS
// move Down the tetromino/ item 
item.prototype.moveDown = function(){
    if(!this.collision(0, 1, this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }
    else{
        // lock the tetrimino and generate a new one
        this.lock();
        p = randomItem();
    }
    
}

// move Right the tetromino
item.prototype.moveRight = function(){
    if(!this.collision(1, 0, this.activeTetromino)){
        this.unDraw();
        this.x++;
        this.draw();
    }   
} 

// move Left the tetromino
item.prototype.moveLeft = function(){
    if(!this.collision(-1, 0, this.activeTetromino)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// to perform hard drop
item.prototype.hardDrop = function(){
    while (!this.collision(0, 1, this.activeTetromino)) {
        this.moveDown();
    }
}

// to hold currect tetromino
// declaring a variable to keep track of held teromino
let heldTetromino = null;
item.prototype.hold = function(){
    // check if there is already a held tetromino
    if (!heldTetromino) {
        // store the current tetromino as held
        heldTetromino = p;
        heldTetromino.x = Math.floor(COL/2) - 1;
        heldTetromino.y = 0;
        p = randomItem(); // get a new random tetromino
    }
    else {
        // swap the current tetromino with the held tetromino
        let temp = p;
        p = heldTetromino;
        p.x = Math.floor(COL/2) -1;
        p.y = 0;
        heldTetromino = temp;
    }
    drawBoard(); // redraw the board after holding 
}

// to pause the game
let isPaused = false; // variable to track pause state
item.prototype.pause = function() {
    // toggle the pause state
    isPaused = !isPaused;
    // if paused, cancel the animation frame
    if (isPaused) {
        cancelAnimationFrame(drop);
    }
    else {
        // if unpaused, resume the game
        dropStart = Date.now();
        drop();
    }
}

// Rotate the tetromino clockwise
item.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetroNum + 1)%this.tetromino.length];
    let kick = 0; 

    if (this.collision(0, 0, nextPattern)){
        if(this.x > COL/2){
            // collision at right wall. we move the tetrimino to the left
            kick = -1;
        }
        else {
            // collsion at left wall and we move to the right
            kick = 1;
        }
    }
    if( !this.collision(kick, 0, nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetroNum = (this.tetroNum + 1)%this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetroNum];
        this.draw();
    }
}

// rotate the tetromino counter clockwise
item.prototype.rotateCounterClockwise = function() {
    let previousPatternIndex = (this.tetroNum - 1 + this.tetromino.length) % this.tetromino.length;
    let previousPattern = this.tetromino[previousPatternIndex];
    let kick = 0;

    if (this.collision(0, 0, previousPattern)) {
        if (this.x > COL/2) {
            kick = -1;
        }
        else {
            kick = 1;
        }
    }

    if ( !this.collision(kick, 0, previousPattern)) {
        this.unDraw();
        this.x += kick;
        this.tetroNum = previousPatternIndex;
        this.activeTetromino = previousPattern;
        this.draw();
    }
}

let score = 0;

item.prototype.lock = function(){
    for( r =0; r < this.activeTetromino.length; r++){
        for( c = 0; c < this.activeTetromino.length; c++){
            // skip the vacant squares for locking
            if( !this.activeTetromino[r][c]) {
                continue;
            } 
            // locking the items on top of the board -- game over
            if(this.y + r <= 0){
                alert("Game Over"); 
                // stop request animation frame
                gameOver = true;
                break;
            }
            // locking the item by changing the color of the board
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // remove full rows 
    for (r = 0; r < ROW; r++){
        let isRowFull = true;
        for( c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != Vacant);
        }
        if( isRowFull){
            // moving down all the rows above if the row below is full
            for (y = r; y > 1; y--){
                for (c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            // the top row board[0][..] has no row above it
            for (c = 0; c < COL; c++){
                board[0][c] = Vacant;                
            }
            // score incrementation
            score += 10;
        }
    }
    // update the board
    drawBoard();

    // update the score 
    scoreElement.innerHTML = score;
}

// collision detection function
item.prototype.collision = function(x, y, tetromino){
    for( r = 0; r < tetromino.length; r++){
        for( c = 0; c < tetromino.length; c++){
            // skip when the square is empty/ unfilled 
            if(!tetromino[r][c]){
                continue;
            }
            // coordinate of the tetromino after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y; 

            // collision conditions
            if (newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }
            // skip newY < 0; for example board[-1] crushes the game
            if(newY < 0){
                continue;
            }
            // check if there is locked tetrimino already in place
            if(board[newY][newX] != Vacant){
                return true;
            }
        }
    }
    return false;

}

// userAction on tetriminoes
document.addEventListener("keydown",userAction);

function userAction(event) {
    switch (event.key) {
        case "ArrowLeft":
            p.moveLeft();
            break;
        case "ArrowRight":
            p.moveRight();
            break;
        case "ArrowDown":
            p.moveDown();
            break;
        case "ArrowUp":
        case "x":
            p.rotate();
            break;
        case " ":
            p.hardDrop();
            break;
        case "Shift":
        case "c":
            p.hold();
            break;
        case "Control":
        case "z":
            p.rotateCounterClockwise();
            break;
        case "Escape":
        case "F1":
            p.pause();
            break;
        case "0":
        case "NumPad0":
            p.hold();
            break;
        case "8":
        case "NumPad8":
            p.hardDrop();
            break;
        case "4":
        case "NumPad4":
            p.moveLeft();
            break;
        case "6":
        case "NumPad6":
            p.moveRight();
            break;
        case "2":
        case "NumPad2":
            // Soft drop
            break;
        case "1":
        case "5":
        case "9":
        case "NumPad1":
        case "NumPad5":
        case "NumPad9":
            // Rotate 90° clockwise
            p.rotate();
            break;
        case "3":
        case "7":
        case "NumPad3":
        case "NumPad7":
            p.rotateCounterClockwise();
            break;
    }
    dropStart = Date.now(); 
}
    
// drop the piece every 1 sec
let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let diff = now - dropStart;
    if(diff > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver){
        requestAnimationFrame(drop);
    }    
}

drop();



