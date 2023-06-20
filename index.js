var buttonColors = ["red" , "blue" , "green" , "yellow"];       //Declaring an array of color so that random generator can be used to extract
var gamePatterns = [];                                          //color from this array.
var userClickedPattern=[];
var level = 0;
var started = false;

//when button is clicked on screen.
$(".btn").click(function()
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor); //user clicked buttons are stored.

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1); //comparing button sequence with game generated sequence.
});

//keypress to start the game.
$(document).on("tap", function()
{
    if(!started)                              //if game is not started then execute.if started, make started=true.
    {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

//To reset the game.
function startOver()
{
    level=0;
    started=false;
    gamePatterns=[];
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePatterns[currentLevel])  //This will check every button stored in user and game array everytime
    {                                                                    //a new button is added to the user array.
        console.log("success");
        if(userClickedPattern.length === gamePatterns.length)            //This will execute if the total length of user and game array is same.
        {
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];                                       //Making user array empty for next level.
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");                          //Remove game-over class after 200ms.
        },200);

        $("#level-title").text("Game over, press any key to start");

        startOver();                                                     //Call the reset function to make control run through the program again.
    }
}

//Random generation of number that will take a random colored button and display it in form of button clicked.
function nextSequence()
{
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePatterns.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);   //Button indicator for user to make them aware which button
    playSound(randomChosenColor);                                                   //to click.
}

//When button is pressed, play appropriate sound.
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//To animate press effect.
function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed"); //Remove press effect after 100ms.
    }, 100);
}