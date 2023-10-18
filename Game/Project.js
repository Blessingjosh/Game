function pcMove() {
  const randomNumber = Math.random()
  let computerMove = ''
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock'
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper'
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors'
  }
  return computerMove
}
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins:${score.Wins}, Loses:${score.Loses}, Tiles:${score.Tiles}`
}
let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Loses: 0,
  Tiles: 0,
}

updateScoreElement()

let isAutoplay = false;
let intervalId;

function autoplay() {
  if (!isAutoplay) {
   intervalId= setInterval(function () {
      const move = pcMove()
      lastMove(move)
    }, 1000)
    isAutoplay = true;
  }else{
    clearInterval(intervalId)
    isAutoplay=false
  }
}



function lastMove(move) {
  let computerMove = pcMove()
  let result = '';
  if (move === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tile';
    } else if (computerMove === 'Scissors') {
      result = 'You Win';
    } else if (computerMove === 'Paper') {
      result = 'You Lose';
    }
  }
  else if (move === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win'
    } else if (computerMove === 'Paper') {
      result = 'Tile'
    } else if (computerMove === 'Scissors') {
      result = 'You Lose'
    }
  }

  else if (move === 'Scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose'
    } else if (computerMove === 'Paper') {
      result = 'You Win'
    } else if (computerMove === 'Scissors') {
      result = 'Tile'
    }
  }
  if (result === 'You Win') {
    score.Wins += 1
  } else if (result === 'You Lose') {
    score.Loses += 1
  } else if (result === 'Tile') {
    score.Tiles += 1
  }
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.result')
    .innerHTML = `${result}`


  document.querySelector('.move')
    .innerHTML = `You
<img src="Images/${move}-emoji.png" class="icon">
<img src="Images/${computerMove}-emoji.png" class="icon">
Computer`
  updateScoreElement()
 
}