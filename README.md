# Welcome to My Tetris
Tetris is a tile-matching puzzle video game originally designed and programmed by Soviet Russian engineer Alexey Pajitnov.
The first playable version was completed on June 6, 1984, while he was working for the Dorodnitsyn Computing Centre of the 
of the Academy of Science of the Soviet Union in Moscow. He derived its name from combining the Greek numerical 
prefix tetra for the falling pieces containing 4 segments and tennis, Pajitnov's favorite sport.


## Task
This project aims to replicate the basic functionality of the Tetris game using HTML Canvas and JavaScript.
- Render a game board using HTML Canvas, consisting of a grid where tetromonoes fall.
- Generate random tetrominoes with different shapes and colors.
- Allow tetromino movement (left, right, down) and rotation (clockwise, counter clockwise).
- Implement hard drop functionality to instantly drop tetrominoes to the bottom.
- Implement a hold feature to store a tetromino for later use;
- Detect completed lines and clear them from the board.
- Display the current score.
- Allow pausing and resuming the game

## Description
This is a simple Tetris game implemented in JavaScript. It is a classic puzzle game where the player's objective is to manipulate falling tetrominoes, 
geometric shapes composed of four squares blocks each, to create horizontal lines without any gaps.
When a line is completed, it disappears, score increases and any blocks above it fall to fill the space.

## Installation
- HTML5 Canvas: Used to render the game board and tetrominoes.
- JavaScript: Implemented game logic and interactivity.
- CSS: Used for styling and layout.

## Usage
1. Open the 'index.html' file in a web browser
2. Use the arrow keys (up, down, left, right) to move and rotate the falling tetrominoes.
3. Press the spacebar for hard drop, shifting to hold a tetromino, or pausing the game.
4. Try to complete horizontal lines to score points and prevent the stack of tetrominoes from reaching the top of the board.

The following are the standard mappings implemented for computer keyboards:
- Up arrow and X are to rotate 90° clockwise.
- Space to hard drop.
- Shift and C are to hold.
- Ctrl and Z are to rotate 90° counterclockwise.
- Esc and F1 are to pause.
- Left, right, and down arrows are the same as on the console.
- Number pad controls: 0 is to hold.
- 8, 4, 6, and 2 are hard drop, left shift, right shift, and soft drop respectively.
- 1, 5, and 9 are to rotate 90° clockwise.
- 3 and 7 are to rotate 90° counterclockwise. 

This Tetris gameboard can also be accessed from the docode server 
at the URL: http://web-l129d2b21-b834.docode.us.qwasar.io by using the following command in the terminal
$> node html_server.s 

### The Core Team

-- solo -- Prakash Shrestha -- 


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
