var input = document.getElementById('userInput') ;
var guess = document.getElementById('guessButton') ;
var clear = document.getElementById('clearButton') ;
var reset = document.getElementById('resetButton') ;
var scoreButton = document.getElementById('score-bar')
var currentGuess = document.getElementById('currentGuess') ;
var userMessage = document.getElementById('userMessage') ;
var minNumber = document.getElementById('minRange') ;
var maxNumber = document.getElementById('maxRange') ; 
var submitRange = document.getElementById('rangeButton') ;
var winner ;
var userGuess ;
var min ;
var max ;
var score = 10;
var totalScore = 0;

clear.disabled = true ;
reset.disabled = true ;

document.onload = launch();

function rangeSet() {
  
  min = Math.ceil(minNumber.value) ;
  max = Math.floor(maxNumber.value) ;
  if(min > max || minNumber.value.length === 0 || maxNumber.value.length === 0){
    userMessage.innerText = ('Please enter a valid range') ;
  }
  else{
  winner = Math.floor(Math.random() * (max - min)) + min ;
  console.log('Winning number is ' + winner) ;
  console.log('Min num is: ' + min + ' Max num is: ' +  max) ;
  userMessage.innerText = ('Number is set between ' + min + ' and ' + max + ', begin guessing!') ;
  reset.disabled = false ;

}
}

function clearEnable() {

  if(input.value != ''){
    clear.disabled = false ;

  }
}


function guessGrabber() {

  currentGuess.innerText = input.value ;
  userGuess = parseInt(input.value, 10) ;
  console.log('Current guess is: ' + userGuess) ;

}

function clearInput() {

  console.log('clear clicked') ;
  input.value = '' ;
  clear.disabled = true;

}

function resetScreen() {

  clearInput() ;
  currentGuess.innerText = '0';
  userMessage.innerText = 'Please enter your guessing range again' ;
  minNumber.value = '';
  maxNumber.value = '';
  winner = undefined ;
  clear.disabled = true ;
  reset.disabled = true ; 
  totalScore = 0;
  console.log('totalscore reset, now equal to: ' + totalScore)

}


function winTester() {
  if(isNaN(userGuess)){
    userMessage.innerText = 'Must input a valid number';
  }
  else if(userGuess < min || userGuess > max){
    userMessage.innerText = 'Please enter a number within range' ;
  }
  else if(userGuess === winner) {
    rangeAdder();
    console.log('Minimum number: ' + min + ' Maximum number: ' + max) ;
    console.log('current score is: ' + score)
    totalScore = totalScore + score;
    document.getElementById('totalScoreCount').innerText = totalScore;
    userMessage.innerText = ('GREAT JOB! \nLet\'s make it harder...\n The number to guess is now between ' + min + ' and ' + max) ;
    winner = Math.floor(Math.random() * (max - min)) + min ;
    console.log('The new winning number is: ' + winner) ;
    console.log('total score is: ' + totalScore)
    score = 10;
  }
  else if(userGuess > winner) {
    userMessage.innerText = 'That guess is too high.' ;
    score -= 1;
    console.log('current score is: ' + score)

  }
  else{userMessage.innerText = 'That guess is too low' ;
    score -=1;
    console.log('current score is: ' + score)
}
  return totalScore;
}

function rangeAdder() {
    
    min -= 10;
    max += 10;
    maxNumber.value = max ;
    minNumber.value = min ;
    
  }

function displayToggle(){
  var dropDownMenu = document.getElementById('dropdown-content');
    if (dropDownMenu.style.display == "none") {
        dropDownMenu.setAttribute("style", "display:inline")
    } else {
        dropDownMenu.setAttribute("style", "display:none")
    }
}

function launch() {

  var i = 0;
  var maxCount = 101;
  delay = 20;

  var iID = setInterval(function() {
    currentGuess.innerText = i;
    if (++i >= maxCount){
      clearInterval(iID);
      currentGuess.innerText = '0';
    } 
    },
   delay);

}

input.addEventListener('input', clearEnable) ;
submitRange.addEventListener('click', rangeSet) ;
guess.addEventListener('click', guessGrabber) ;
guess.addEventListener('click', winTester) ; 
clear.addEventListener('click', clearInput) ;
reset.addEventListener('click', resetScreen) ;
scoreButton.addEventListener('click', displayToggle);
