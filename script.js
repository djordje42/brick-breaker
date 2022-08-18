var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var ballX = canvas.width / 2
var ballY = canvas.height / 2
var ballXDelta = 7
var ballYDelta = 7
var radius = 10
var paddleX = 600
var paddleY = 570
var paddleWidth = 160
var paddleHeight = 10
var leftPressed = false
var rightPressed = false
var paddleSpeed = 10
var bricks = []
var rowCount = 5
var columnCount = 22
var score = 0
var gameEnded = false



function Brick(x1, y1, color1){
    this.x = x1
    this.y = y1
    this.w = 50
    this.h = 20
    this.color = color1
    this.hasBeenHit = false
}



for(var r = 0; r < rowCount; r++){
    bricks[r] = []
    for(c = 0; c < columnCount; c++){
        var startX = 50 + (c * 50)
        var startY = 50 + (r * 20)
        var red = Math.floor(Math.random() * 256)
        var green = Math.floor(Math.random() * 256)
        var blue = Math.floor(Math.random() * 256)
        var color = "rgb("+ red +"," + green + "," + blue + ")"
        bricks[r][c] = new Brick(startX, startY, color)
    }
}

const drawScore = () =>{
    ctx.font = "32px Times New Roman"
    ctx.fillStyle = "whitesmoke"
    ctx.fillText ("Score: " + score , 1050, 35)
}

const drawBricks = () => {
    for(var r = 0; r < rowCount; r++){
        for(c = 0; c < columnCount; c++){

            if(!bricks[r][c].hasBeenHit){
            ctx.beginPath()
            ctx.rect(bricks[r][c].x, bricks[r][c].y, bricks[r][c].w, bricks[r][c].h)
            ctx.fillStyle = bricks[r][c].color
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
            }
            if(!bricks[r][c].hasBeenHit){
            if(ballX + 10 > bricks[r][c].x && ballX - 10 < bricks[r][c].x + bricks[r][c].w && ballY + 10 > bricks[r][c].y && ballY - 10 < bricks[r][c].y + bricks[r][c].h ){
                bricks[r][c].hasBeenHit = true
                score++
                ballYDelta *= -1
            }
        }
        }
    }
}

const keyDownHandler = (e) => {
    if(e.keyCode == 37){
        leftPressed = true
    }
    else if(e.keyCode == 39){
        rightPressed = true
    }
}

const keyUpHandler = (e) => {
    if(e.keyCode == 37){
        leftPressed = false
    }
    else if(e.keyCode == 39){
        rightPressed = false
    }
}


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

const movement = () => {
    if(leftPressed && (paddleX - paddleSpeed) >= 0){
        paddleX -= paddleSpeed
    }
    else if(rightPressed && (paddleX + paddleSpeed + paddleWidth) <= 1200){
        paddleX += paddleSpeed
    }
}

const drawPaddle = () => {
    ctx.fillStyle = "purple"
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
}

const drawBall = () => {
    ctx.strokeStyle = "yellow"
    ctx.beginPath()
    ctx.arc(ballX, ballY, radius, 0, 2*Math.PI)
    ctx.fillStyle = "yellow"
    ctx.fill()
    ctx.stroke()
}

const collision = () => {
    if(ballX + radius > 1200 || ballX - radius < 0) {
       ballXDelta = -1 * ballXDelta  
       if(ballXDelta < 0){
        
       }
       else{
        
       }
    }
    if(ballY + radius > 600 || ballY - radius < 0){
        ballYDelta = -1* ballYDelta
        if(ballY + radius > 600){
            gameEnded = true
        }
    }

    if(ballX > paddleX && ballX < paddleX + paddleWidth && ballY + radius > paddleY){
        ballYDelta *= -1
    }
}




const gameLoop = () => {
    ctx.clearRect(0, 0, 1200, 600)
    if(!gameEnded){
    drawBall()
    collision()
    drawPaddle()
    movement()
    drawBricks()
    drawScore()
    ballX = ballX + ballXDelta
    ballY = ballY + ballYDelta
    }else{
        ctx.font = "100px Times New Roman"
        ctx.fillStyle = "whitesmoke"
        ctx.fillText ("Game over ", 300, 300)
        ctx.fillText ("Your score: " + score , 300, 420)
    }
}

setInterval(gameLoop, 10)

const startGame = () => {
    let startDiv = document.getElementById("start")
    let gameCanvas = document.getElementById("myCanvas")
    gameLoop()
}