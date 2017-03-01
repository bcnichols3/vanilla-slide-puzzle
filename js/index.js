import Puzzle from './Puzzle';

function createBoard(size, image) {
  const puzzle = new Puzzle(size, image);
  document.getElementById('shuffle').onclick = puzzle.shufflePieces;
}

function sizeChange(e) {
  e.preventDefault();
  let size = e.target.value;
  let image = document.getElementById('upload').value;
  if (image === '') createBoard(size);
  else createBoard(size, image);
  document.getElementById('size').value = size;
}

function customPhoto(e) {
  e.preventDefault();
  let size = document.getElementById('size').value;
  let image = e.target.value;
  if (image === '') {
    createBoard(size);
  } else {
    document.getElementById('upload').value = image;
    createBoard(size, image);
  }
}

window.onload = function() {
  createBoard();
  document.getElementById('size').onchange = sizeChange;
  document.getElementById('upload').onchange = customPhoto;
};
