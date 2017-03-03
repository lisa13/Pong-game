
// Here are all the variables

var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 9;
var ballSpeedY = 4;

var playerScore1 = 0;
var playerScore2 = 0; 

var paddle1Y = 250;
var paddle2Y = 250;

var showWinScreen = false;

const PADDLE_THICKNESS = 8;
const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 3;

//function mouse movement

function calculateMousePos(evt) {
var rect = canvas.getBoundingClientRect();
var root = document.documentElement;
var mouseX = evt.clientX - rect.left - root.scrollLeft;
var mouseY = evt.clientY - rect.top - root.scrollTop;
return {

x:mouseX,
y:mouseY
};

}


//mousedown event listener function
function handleMouseClick(evt){
if(showWinScreen){
playerScore1=0;
playerScore2=0;
showWinScreen = false;
}
}


//show everything when the window loads
window.onload = function() {
canvas = document.getElementById('gameCanvas'); 
canvasContext = canvas.getContext('2d');

//these lines set the refreshment speed of the page
var framesPerSecond = 30;
setInterval(function() {
moveEverything();
drawEverything();
}, 1000/framesPerSecond );

canvas.addEventListener('mousedown', handleMouseClick);

canvas.addEventListener('mousemove',
function(evt) {
var mousePos = calculateMousePos(evt);
paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);

});

}

//function reset the ball
function ballReset(){

 if(playerScore1 >= WINNING_SCORE || 
 playerScore2 >= WINNING_SCORE){
 
 playerScore1 =0;
 playerScore2 =0;
 showWinScreen = true;
 
 }
ballSpeedX = -ballSpeedX;
ballX = canvas.width /2;
ballY = canvas.height /2;
}

function computerMovement(){
var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
if(paddle2YCenter < ballY-35){
paddle2Y += 6;
}else{ if(paddle2YCenter > ballY+35)
paddle2Y -=6;
}

}

//ball speed and properties
function moveEverything () {
if(showWinScreen){
return;
}
 computerMovement();
ballX += ballSpeedX;
ballY +=  ballSpeedY;

if(ballX < 0) {
if(ballY > paddle1Y && 
ballY < paddle1Y + PADDLE_HEIGHT){
ballSpeedX = -ballSpeedX;

 var deltaY = ballY
 -(paddle1Y + PADDLE_HEIGHT/2);
  ballSpeedY = deltaY * 0.35;
}else{
ballReset();
playerScore2 ++;
}
}
if(ballX > canvas.width) {
if(ballY > paddle2Y && 
ballY < paddle2Y + PADDLE_HEIGHT){
ballSpeedX = -ballSpeedX;
  var deltaY = ballY
 -(paddle2Y + PADDLE_HEIGHT/2);
  ballSpeedY = deltaY * 0.35;
}else{
ballReset();
playerScore1 ++;
}
}
 
if(ballY < 0) {
ballSpeedY = -ballSpeedY
}

if(ballY > canvas.height) {
ballSpeedY = -ballSpeedY
}
}

// 1 function drawing the canvas elements
function drawEverything(){
 
//   black background
colorRect(0,0,canvas.width,canvas.height,'grey');
if(showWinScreen){
canvasContext.fillStyle = 'black';
canvasContext.fillText('Click To Continue', 100, 100);
 return;
 }
//left paddle
colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'blue');

// right paddle
colorRect(canvas.width -PADDLE_THICKNESS,paddle2Y, 10,PADDLE_HEIGHT,'green');

//white ball
colorCircle(ballX,ballY,10,'white');

//draw the score context
canvasContext.fillText(playerScore1, 100, 100);
canvasContext.fillText(playerScore2, canvas.width-100, 100);

}

// 3 function for integrating drawColor into fillStyle and fillRect
function colorRect(leftX,topY,width,height,drawColor) {
canvasContext.fillStyle = drawColor;
canvasContext.fillRect(leftX,topY,width,height);

}

//2  function for integrating codes for circle into colorCircle
function colorCircle(centerX, centerY,radius,drawColor) {
canvasContext.fillStyle = drawColor;
canvasContext.beginPath();
canvasContext.arc(centerX,centerY,10,0,Math.PI*2,true);
canvasContext.fill();

}

