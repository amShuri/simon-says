const computerSequence = [];
const userSequence = [];
let turnDurationMs = 1000;
let highlightDurationMs = 500;
let userScore = 0;

document.querySelector('#start-button').onclick = startGame;

document.querySelector('#game-board').onclick = function (e) {
  handleUserTileClick(e);
};

document.querySelector('#game-speed').onclick = function (e) {
  updateGameSpeed(e);
};

function startGame() {
  displayScore(userScore);
  disableStartButton();
  playComputerTurn();
}

function handleUserTileClick(e) {
  if (e.target.tagName !== 'BUTTON') return;

  const $userTile = e.target;
  userSequence.push($userTile);
  highlightTile($userTile, highlightDurationMs);

  const computerTile = computerSequence[userSequence.length - 1];
  if (computerTile !== $userTile) {
    stopGame();
    return;
  }

  if (computerSequence.length === userSequence.length) {
    handleUserTurnCompletion();
  }
}

function handleUserTurnCompletion() {
  disableUserInput();
  setTimeout(() => {
    userScore += 1;
    displayScore(userScore);
    playComputerTurn();
  }, turnDurationMs);
}

function updateGameSpeed(e) {
  if (e.target.tagName !== 'INPUT') return;

  const userSelectedValue = e.target.value;
  turnDurationMs = userSelectedValue;
  highlightDurationMs = userSelectedValue / 2;
}

function getRandomTile() {
  const $gameTiles = document.querySelectorAll('.tile');
  const randomNumber = Math.floor(Math.random() * $gameTiles.length);
  return $gameTiles[randomNumber];
}

function playComputerTurn() {
  if (userSequence.length > 0) {
    resetSequence(userSequence);
  }
  disableUserInput();
  updateGameStatus('computer turn');

  const $computerTile = getRandomTile();
  computerSequence.push($computerTile);

  for (let i = 0; i < computerSequence.length; i += 1) {
    const currentTile = computerSequence[i];
    const highlightDelay = (i + 1) * turnDurationMs;
    setTimeout(() => {
      highlightTile(currentTile, highlightDurationMs);
    }, highlightDelay);
  }

  const computerTurnDuration = (computerSequence.length + 1) * turnDurationMs;
  setTimeout(() => {
    enableUserInput();
    updateGameStatus('your turn');
  }, computerTurnDuration);
}

function highlightTile(tile, duration) {
  tile.classList.add('highlighted');
  setTimeout(() => {
    tile.classList.remove('highlighted');
  }, duration);
}

function disableUserInput() {
  document.querySelectorAll('.tile').forEach((btn) => (btn.disabled = true));
}
function enableUserInput() {
  document.querySelectorAll('.tile').forEach((btn) => (btn.disabled = false));
}

function updateGameStatus(status) {
  const $gameStatus = document.querySelector('#status-display');
  $gameStatus.textContent = status;
  if (status !== 'your turn') {
    $gameStatus.classList.remove('highlighted');
  } else {
    $gameStatus.classList.add('highlighted');
  }
}

function disableStartButton() {
  document.querySelector('#start-button').disabled = true;
}

function enableStartButton() {
  document.querySelector('#start-button').disabled = false;
}

function resetSequence(sequence) {
  sequence.splice(0);
}

function displayScore(score) {
  document.querySelector('#score-display').textContent = `Score: ${score}`;
}

function stopGame() {
  userScore = 0;
  updateGameStatus('game over');
  disableUserInput();
  resetSequence(computerSequence);
  enableStartButton();
  document.querySelector('#start-button').textContent = 'play again';
}
