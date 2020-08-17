
let min = 1,
    max = 100,
    winningNum = getRandomNum(min, max),
    guessesLeft = 7;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});
      
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {

  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
    guessInput.disabled = true;

  } else {

    guessesLeft -= 1;
    if(guessesLeft === 0){
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

    } else {
      if(guess>winningNum){
        setMessage(`${guess} is higher then expecting, you have ${guessesLeft} guesses left!`,'red')
      } else{
        setMessage(`${guess} is lower then expecting, you have ${guessesLeft} guesses left!`,'blue')
      }
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
    }
  }
}
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}