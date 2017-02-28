import Puzzle from './Puzzle';

function clearBoard() {
  const board = document.getElementById('board');
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function createBoard(size) {
  clearBoard();
  const puzzle = new Puzzle(size);
  document.getElementById('shuffle').onclick = puzzle.shufflePieces;
}

function sizeChange(e) {
  e.preventDefault();
  createBoard(e.target.value);
}

window.onload = function() {
  createBoard();
  document.getElementById('size').onchange = sizeChange;
};
