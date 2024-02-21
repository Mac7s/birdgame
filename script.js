//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
 

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;

let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

 
let s =0;

//pipes
let pipeWidth =64;
let pipeHeight = 512;

let topPipeImg;
let bottomPipeImg;

let birdSpeed = 0;

let pipeArray = [];


let gameOver = false;

window.onload = function(){
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./bird.png";

    birdImg.onload = function(){
        context.drawImage(birdImg , birdX, birdY, birdWidth, birdHeight);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    setInterval(placePipes, 1500);
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBird);



   
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, boardWidth, boardHeight);
    birdSpeed += 0.5;
    bird.y += birdSpeed;
    context.drawImage(birdImg , bird.x, bird.y, bird.width, bird.height);

    for(let i=0; i<pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += -2;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        if(winOrLose(bird, pipe)){
            gameOver = true;
        }
        if(pipe.passed == false && bird.x > pipe.x + pipe.width){
            pipe.passed = true;
            s+=0.5;
        }
    }
    
    context.fillStyle = "white";
    context.font = "50px sans-serif";
    context.fillText(s, 5, 50);

    if(gameOver){
        context.fillText("Game Over", 5 , 100);
    }

}


function placePipes(){
    if(gameOver){
        return;
    }
    let randomPipeY = -(pipeHeight/4 + Math.random()*pipeHeight/2);
    let space = pipeHeight/4;
    let topPipe = {
        img : topPipeImg,
        width : pipeWidth,
        height : pipeHeight,
        x : boardWidth,
        y : randomPipeY,
        passed :false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        width : pipeWidth,
        height : pipeHeight,
        x : boardWidth,
        y : pipeHeight + randomPipeY + space,
        passed :false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e){
    if(e.code == "ArrowUp" || e.code == "Space"){
        birdSpeed = -6;
    }
}

function winOrLose(bird, pipe){
    return bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + pipe.height &&
            bird.y + bird.height > pipe.y;
}



 
