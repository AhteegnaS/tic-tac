// app.js
console.log('app.js loaded');

const BOARD_SIZE = 9;
let board = Array(BOARD_SIZE).fill(null);
let turnEl = null;
let resultEl = null;
let boardEl = null;
let startSelect = null;
let newBtn = null;
let currentTurn = 'X';

function renderBoard() {
  boardEl.innerHTML = '';
  for (let i = 0; i < BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.textContent = board[i] || '';
    cell.addEventListener('click', () => onCellClick(i));
    boardEl.appendChild(cell);
  }
}

function setTurnText() {
  turnEl.textContent = currentTurn;
}

function onCellClick(index) {
  if (board[index] || checkWinner()) return;
  board[index] = currentTurn;
  renderBoard();
  const winner = checkWinner();
  if (winner) {
    resultEl.textContent = `${winner} wins!`;
    turnEl.textContent = '—';
    return;
  }
  if (board.every(Boolean)) {
    resultEl.textContent = `It's a draw.`;
    turnEl.textContent = '—';
    return;
  }
  currentTurn = currentTurn === 'X' ? 'O' : 'X';
  setTurnText();
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function newGame() {
  board = Array(BOARD_SIZE).fill(null);
  currentTurn = startSelect.value || 'X';
  resultEl.textContent = 'Good luck!';
  renderBoard();
  setTurnText();
}

function init() {
  boardEl = document.getElementById('board');
  turnEl = document.getElementById('turn');
  resultEl = document.getElementById('result');
  startSelect = document.getElementById('startSelect');
  newBtn = document.getElementById('newBtn');

  newBtn.addEventListener('click', newGame);
  startSelect.addEventListener('change', () => { currentTurn = startSelect.value; setTurnText(); });

  // initial render
  newGame();
}

document.addEventListener('DOMContentLoaded', init);
