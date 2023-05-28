
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];


var level = 0;
var started = false;

$(document).keydown(function () {

    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    compareUserPatternVsGamePattern();

});


function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.random();
    randomNumber = Math.floor(4 * randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var buttonId = "#" + randomChosenColor;
    $(buttonId).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $('body').addClass("game-over");
    setTimeout(function () {
        $('body').removeClass("game-over");
    }, 1000);
    $("#level-title").text("Game Over, Press Any Key to Re-Start");
    started = false;
    level = 0;
    gamePattern = [];
   
}


function compareUserPatternVsGamePattern() {
    
    if(gamePattern.length > userClickedPattern.length) {

        for(var i=0;i<userClickedPattern.length;i++){

            if(gamePattern[i]!=userClickedPattern[i]){
                startOver();

            }
        }
    }
    else if (gamePattern.length == userClickedPattern.length && gamePattern.every((element, index) => element == userClickedPattern[index])) {


        setTimeout(function () { nextSequence() }, 1000);
    }
    else {
        startOver();
    }
    // COMPARISON OF ARRAYS IMPORTANT POINT
    // Really, this shouldn't be difficult, as you'd think we could easily use either the loose equality (double equals - ==) 
    // or the strict equality (triple equals - ===). But unfortunately, you cannot use them in this case.
    // This happens because JavaScript arrays have a type of Object:
    // Objects are not compared based on their values but based on the references of the variables:
}

function playSound(name) {


    var buttonId = "#" + name;
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $('#' + currentColor).addClass("pressed ");
    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed ");
    }, 100);

}
