const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
  {index: 0, char: 0},
]

// d: 0 down 1 up 2 left 3 right
let pos = [
    {x: 200, y: 200, d: 0},
]

var currentScene = 1;
var character_size = 40;
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let food_x;
let food_y;
let dx = character_size;
// Vertical velocity
let dy = 0;
let dir = 0;
// arm direction
var arm = 1;
var characternum = 1;
var character01 = new Array();
var character02 = new Array();
var character03 = new Array();

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
document.addEventListener("keydown", change_direction);
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");

var Counter = 0;
var TotalImages = 30;

var onloadCallback = function(){
    // Increment the counter
    Counter++;

    // Verify if the counter is less than the number of images
    if(Counter < TotalImages){
        return;
    }
    // Trigger the final callback if is the last img
    main();
    gen_food();
};

let start_sound = new Audio('assets/game-start.mp3');
let collect_sound = new Audio('assets/collect.mp3');
let background_music = new Audio('assets/background_music.mp3');

var background = new Image();
var start_button = new Image();
var end_button = new Image();
character01[0] = new Image();
character01[1] = new Image();
character01[2] = new Image();
character01[3] = new Image();
character01[4] = new Image();
character01[5] = new Image();
character01[6] = new Image();
character01[7] = new Image();
character01[8] = new Image();

character02[0] = new Image();
character02[1] = new Image();
character02[2] = new Image();
character02[3] = new Image();
character02[4] = new Image();
character02[5] = new Image();
character02[6] = new Image();
character02[7] = new Image();
character02[8] = new Image();

character03[0] = new Image();
character03[1] = new Image();
character03[2] = new Image();
character03[3] = new Image();
character03[4] = new Image();
character03[5] = new Image();
character03[6] = new Image();
character03[7] = new Image();
character03[8] = new Image();

background.src = "assets/background.png";
start_button.src = "assets/start_button.png";
end_button.src = "assets/replay_button.png";
character01[0].src = "assets/character01_down_default.png";
character01[1].src = "assets/character01_down_left.png";
character01[2].src = "assets/character01_down_right.png";
character01[3].src = "assets/character01_up_left.png";
character01[4].src = "assets/character01_up_right.png";
character01[5].src = "assets/character01_left_left.png";
character01[6].src = "assets/character01_left_right.png";
character01[7].src = "assets/character01_right_left.png";
character01[8].src = "assets/character01_right_right.png";

character02[0].src = "assets/character02_down_default.png";
character02[1].src = "assets/character02_down_left.png";
character02[2].src = "assets/character02_down_right.png";
character02[3].src = "assets/character02_up_left.png";
character02[4].src = "assets/character02_up_right.png";
character02[5].src = "assets/character02_left_left.png";
character02[6].src = "assets/character02_left_right.png";
character02[7].src = "assets/character02_right_left.png";
character02[8].src = "assets/character02_right_right.png";

character03[0].src = "assets/character03_down_default.png";    
character03[1].src = "assets/character03_down_left.png";
character03[2].src = "assets/character03_down_right.png";
character03[3].src = "assets/character03_up_left.png";
character03[4].src = "assets/character03_up_right.png";
character03[5].src = "assets/character03_left_left.png";
character03[6].src = "assets/character03_left_right.png";
character03[7].src = "assets/character03_right_left.png";
character03[8].src = "assets/character03_right_right.png";

background.onload = onloadCallback;
start_button.onload = onloadCallback;
end_button.onload = onloadCallback;
character01[0].onload = onloadCallback;
character01[1].onload = onloadCallback;
character01[2].onload = onloadCallback;
character01[3].onload = onloadCallback;
character01[4].onload = onloadCallback;
character01[5].onload = onloadCallback;
character01[6].onload = onloadCallback;
character01[7].onload = onloadCallback;
character01[8].onload = onloadCallback;

character02[0].onload = onloadCallback;
character02[1].onload = onloadCallback;
character02[2].onload = onloadCallback;
character02[3].onload = onloadCallback;
character02[4].onload = onloadCallback;
character02[5].onload = onloadCallback;
character02[6].onload = onloadCallback;
character02[7].onload = onloadCallback;
character02[8].onload = onloadCallback;

character03[0].onload = onloadCallback;
character03[1].onload = onloadCallback;
character03[2].onload = onloadCallback;
character03[3].onload = onloadCallback;
character03[4].onload = onloadCallback;
character03[5].onload = onloadCallback;
character03[6].onload = onloadCallback;
character03[7].onload = onloadCallback;
character03[8].onload = onloadCallback;

snakeboard.onclick = click_button;

function draw_start_button(){
  snakeboard_ctx.drawImage(start_button, 0, 128, 400, 144);
}

function draw_end_button(){
  snakeboard_ctx.drawImage(end_button, 0, 128, 400, 144);
}

function click_button(event) {
  var rect = snakeboard.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (currentScene == 1) {
      if (x > 0 && x < 400 && y > 128 && y < 272) currentScene = 2;
    }
    else if (currentScene == 3) {
      if (x > 0 && x < 400 && y > 128 && y < 272) currentScene = 2;
    }
}

function start_game() {
  clear_board();
  draw_start_button();
}

function end_game() {
  draw_end_button();
}

// main function called repeatedly to keep the game running
var game_doing = false;
function main() {
  if (currentScene == 1) {
    start_game();
  } else if (currentScene == 2) {
    if (game_doing == false) {
      snake = [
        {index: 0, char: 0},
      ]
      pos = [
        {x: 200, y: 200, d: 0},
      ]
      game_doing = true;
      dx = character_size;
      dy = 0;
      background_music.play();
      background_music.currentTime = 0;
      start_sound.play();
      do_game();
    }
  } else if (currentScene == 3) {
    end_game();
  }
  setTimeout(function onTick() {
    main();
    }, 100)
}

function do_game() {
  if (has_game_ended()) {
    currentScene = 3;
    game_doing = false;
    return;
  }

    changing_direction = false;
    if (arm == 1) arm = 2;
    else arm = 1;
    setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    // Repeat
    do_game();
    }, 150)
}

// draw a border around the canvas
function clear_board() {
    snakeboard_ctx.drawImage(background, 0, 0, 400, 400);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

function drawFood() {
    if (characternum == 0)
        snakeboard_ctx.drawImage(character01[0], food_x, food_y, character_size, character_size);
    else if (characternum == 1)
        snakeboard_ctx.drawImage(character02[0], food_x, food_y, character_size, character_size);
    else
        snakeboard_ctx.drawImage(character03[0], food_x, food_y, character_size, character_size);
}

// Draw one snake part
function drawSnakePart(snakePart) {
    var index = snakePart.index;
    var imagedir = (pos[index].d)*2;

    if (snakePart.char == 0)
        snakeboard_ctx.drawImage(character01[imagedir+arm], pos[index].x, pos[index].y, character_size, character_size);
    else if (snakePart.char == 1)
        snakeboard_ctx.drawImage(character02[imagedir+arm], pos[index].x, pos[index].y, character_size, character_size);
    else
        snakeboard_ctx.drawImage(character03[imagedir+arm], pos[index].x, pos[index].y, character_size, character_size);
}

function has_game_ended() {
  for (let i = 1; i < pos.length; i++) {
    if (pos[i].x === pos[0].x && pos[i].y === pos[0].y) return true
  }
  const hitLeftWall = pos[0].x < 0;
  const hitRightWall = pos[0].x > snakeboard.width - character_size;
  const hitToptWall = pos[0].y < 0;
  const hitBottomWall = pos[0].y > snakeboard.height - character_size;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / character_size) * character_size;
}

function gen_food() {
  // Generate a random number the food x-coordinate
  food_x = random_food(0, snakeboard.width - character_size);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, snakeboard.height - character_size);
  // if the new food location is where the snake currently is, generate a new food location
  pos.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const SPACE_BAR = 32;

  const keyPressed = event.keyCode;
  if (keyPressed == SPACE_BAR) {
    if (currentScene == 1) currentScene = 2;
    else if (currentScene == 3) currentScene = 2;
  }
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const goingUp = dy === -character_size;
  const goingDown = dy === character_size;
  const goingRight = dx === character_size;
  const goingLeft = dx === -character_size;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -character_size;
    dy = 0;
    dir = 2;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -character_size;
    dir = 1;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = character_size;
    dy = 0;
    dir = 3;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = character_size;
    dir = 0;
  }
}

function move_snake() {
  // Create the new Snake's head
  const head = {x: pos[0].x + dx, y: pos[0].y + dy, d: dir};
  // Add the new head to the beginning of snake body
  pos.unshift(head);
  const has_eaten_food = pos[0].x === food_x && pos[0].y === food_y;
  if (has_eaten_food) {
      collect_sound.play();
      const tail = {index: snake.length, char: characternum};
      snake.push(tail);
    // Generate new food location
    gen_food();
    // change next coming character
    if (characternum == 1) characternum = 2;
    else characternum = 1;
    //characternum = (characternum+1)%3;
  } else {
    // Remove the last part of snake body
    pos.pop();
  }
}
