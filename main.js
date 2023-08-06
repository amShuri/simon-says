const computerSequence = [];
const userSequence = [];
const TURN_DURATION_MS = 1000;
const HIGHLIGHT_DURATION_MS = 500;

document.querySelector('#start-button').onclick = function () {
  playComputerTurn();
};

document.querySelector('#game-board').onclick = function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  const $userTile = e.target;
  userSequence.push($userTile);
  highlightTile($userTile, HIGHLIGHT_DURATION_MS);

  const $computerTile = computerSequence[userSequence.length - 1];
  if ($computerTile !== $userTile) {
    stopGame();
    return;
  }

  if (computerSequence.length === userSequence.length) {
    disableUserInput();
    setTimeout(() => {
      playComputerTurn();
    }, TURN_DURATION_MS);
  }
};

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
    const highlightDelay = (i + 1) * TURN_DURATION_MS;
    setTimeout(() => {
      highlightTile(currentTile, HIGHLIGHT_DURATION_MS);
    }, highlightDelay);
  }

  const computerTurnDuration = (computerSequence.length + 1) * TURN_DURATION_MS;
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
  const $gameStatus = document.querySelector('#game-status p');
  $gameStatus.textContent = status;
  if (status !== 'your turn') {
    $gameStatus.classList.remove('highlighted');
  } else {
    $gameStatus.classList.add('highlighted');
  }
}

function resetSequence(sequence) {
  sequence.splice(0);
}

function stopGame() {
  alert('Game Over');
  updateGameStatus('game over');
  disableUserInput();
  resetSequence(computerSequence);
  document.querySelector('#start-button').textContent = 'play again';
}
