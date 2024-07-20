const buttonColors = ["green","red","yellow","blue"];
const gamePattern = [];
const userPattern = [];
let count = 0;
let userCount = 0;
let start = false;

$(document).keypress(function(event){
    if (!start) {
        $("body").removeClass("game-over");
        start = true;
        startGame();
    }
});


$(".btn").on("click",function(){
    let userColor,button;
    button = $(this);
    userColor = button.attr('id');
    button.addClass("pressed");
    userPattern.push(userColor);
    gameSound(userColor);
    setTimeout(function(){
        button.removeClass("pressed");
    },100);
    if((--userCount) === 0){
        checkAnswer();
    }
});

function startGame(){
    userPattern.length = 0;
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    showPattern(randomChosenColour);
    gameSound(randomChosenColour);
    changeName(++count);
    userCount = count;
}

function gameOver(){
    gameSound("wrong");
    $("h1").html("Game over.<br>Press Any key to Restart.");
    gamePattern.length = 0;
    userPattern.length = 0;
    $("body").addClass("game-over");
    start = false;
    count = 0;
}

function checkAnswer(){
let result = gamePattern.every(function(element,index){
    return element === userPattern[index];
});
if (result) {
    setTimeout(function(){
        startGame();
    },1000);
} else gameOver();
}

function changeName(i) {
    $("h1").text("Level " + i);
}

function showPattern(p) {
    $("." + p).fadeOut(100).fadeIn(100);
}

function gameSound(s) {
    switch (s) {
        case "red":
            var redSound = new Audio ("sounds/red.mp3");
            redSound.play();
            break;
        case "blue":
            var blueSound = new Audio ("sounds/blue.mp3");
            blueSound.play();
            break;    
        case "green":
            var greenSound = new Audio ("sounds/green.mp3");
            greenSound.play();
            break;        
        case "yellow":
            var yellowSound = new Audio ("sounds/yellow.mp3");
            yellowSound.play();
            break;    
        default:
            var wrong = new Audio ("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}
