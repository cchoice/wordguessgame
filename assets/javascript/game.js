Create an array to hold the potential answers

var writers = ["BALDWIN" , "WALLACE" , "TWAIN" , "DIDION" , "BUTLER", "MURAKAMI" , "MORRISON" , "HUGHES" , "WRIGHT" , "COATES"];
var totalGuesses = 9;       // number of tries
var userGuesses = [];       // letters the user guessed
var computerPick;           // array number the machine choose randomly
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 0;        // How many tries the player has left
var finishedGame = false;   // Flag for 'press any key to try again'    
var wins = 0;               //winsyc    
var losses = 0;             //losses

// key entered sound
var keySound = new Audio('sounds\sound.mp3');

// start the game
function startGame() {
   guessesLeft = totalGuesses;

   //grab a random number from the writers array  (number of words)
   computerPick = Math.floor(Math.random() * (writers.length));

   console.log(WRITERS)

   if(writers[computerPick] == writers[0]) {
       $('.clue').html("<img src='assets\images\baldwin.JPG' width='300'/>");
   }else if(writers[computerPick] == writers[1]) {
       $('.clue').html("<img src='assets\images\butler.JPG' width='300'/>");
   }else if(writers[computerPick] == writers[2]) {
       $('.clue').html("<img src='assets\images\coates.JPG' width='300'/>");
   }else if(writers[computerPick] == writers[3]) {
       $('.clue').html("<img src='assets\images\didion.JPG' width='300'/>");
   }else if(writers[computerPick] == writers[4]) {
       $('.clue').html("<img src='assets\images\hughes.JPG' width='300'/>"); 
   }else if(writers[computerPick] == writers[5]) {
       $('.clue').html("<img src='assets\images\morrison.JPG' width='300'/>"); 
   }else if(writers[computerPick] == writers[6]) {
       $('.clue').html("<img src='assets\images\twain.JPG' width='300'/>"); 
   }else if(writers[computerPick] == writers[7]) {
       $('.clue').html("<img src='assets\images\wallace.JPG' width='300'/>"); 
   }else if(writers[computerPick] == writers[8]) {
       $('.clue').html("<img src='assets\images\wright.JPG' width='300'/>");      
   }else if(writers[computerPick] == writers[9]) {
       $('.clue').html("<img src='assets\images\murakami.JPG' width='300'/>");                               
   }else($('.clue').text('neither of these'));

   // Clear out arrays
   userGuesses = [];
   wordGuessed = [];

   //build the word with blanks
   for (var i = 0; i < writers[computerPick].length; i++) {
       wordGuessed.push("_");
   }  

   //gamewin, gameover, title
   document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
   document.getElementById("gameover-image").style.cssText = "display: none";
   document.getElementById("youwin-image").style.cssText = "display: none";

   //refresh the screen
   refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {

   document.getElementById("gameWins").innerText = wins;
   document.getElementById("gameLosses").innerText = losses;

   var guessingWordText = "";
   for (var i = 0; i < wordGuessed.length; i++) {
       guessingWordText += wordGuessed[i];
   }

   //update guesses, word, and letters entered
   document.getElementById("currentWord").innerText = guessingWordText;
   document.getElementById("guessesLeft").innerText = guessesLeft;
   document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
   var positions = [];

   for (var i = 0; i < writers[computerPick].length; i++) {
       if(writers[computerPick][i] === letter) {
           positions.push(i);
       }
   }

   if (positions.length <= 0) {
       guessesLeft--;
   } else {
       for(var i = 0; i < positions.length; i++) {
           wordGuessed[positions[i]] = letter;
       }
   }
};

//check if all letters have been entered.
function checkWin() {
   if(wordGuessed.indexOf("_") === -1) {
       document.getElementById("youwin-image").style.cssText = "display: block";
       document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
       wins++;
       finishedGame = true;
   }
};

//check if the user is out of guesses
function checkLoss()
{
   if(guessesLeft <= 0) {
       document.getElementById("gameover-image").style.cssText = "display: block";
       document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
       losses++;
       finishedGame = true;
   }
}

//guessing
function makeGuess(letter) {
   if (guessesLeft > 0) {
       // Make sure we didn't use this letter
       if (userGuesses.indexOf(letter) === -1) {
           userGuesses.push(letter);
           evaluateGuess(letter);
       }
   }
};

// Event listener
document.onkeydown = function(event) {
   //if the game is finished, restart it.
   if(finishedGame) {
       startGame();
       finishedGame = false;
   } else {
       // Check to make sure a-z was pressed.
       if(event.keyCode >= 65 && event.keyCode <= 90) {
           keySound.play();
           makeGuess(event.key.toUpperCase());
           refreshScreen();
           checkWin();
           checkLoss();

           console.log(START)
       }
   }
};
