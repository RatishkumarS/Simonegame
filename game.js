
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern =[];
var level=0;
var started=false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level  " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function(){
    var clickedButton=$(this).attr("id");
    userClickedPattern.push(clickedButton);
    Sound(clickedButton);
    animation(clickedButton);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(userClickedPatternLength)
{
  if(userClickedPattern[userClickedPatternLength]===gamePattern[userClickedPatternLength])
  {
    if(userClickedPattern.length===gamePattern.length)
  {
    level++;
    $("#level-title").text("Level  "+level);
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
  else{
      Sound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    startOver();
  }
}

function nextSequence() {

  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  Sound(randomChosenColour);
  animation(randomChosenColour);
  console.log(userClickedPattern);
}
function Sound(randomChosenColour){
    var audio = new Audio("sounds/" +randomChosenColour+ ".mp3");
    audio.play();
}
function animation(clickedButton)
{
  $("#"+clickedButton).addClass("pressed");
  setTimeout(function(){
    $("#"+clickedButton).removeClass("pressed");
  },100);
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
  $("#level-title").text("Press A Key to Start");
}
