import Piece from './Piece';

export default class Puzzle {
  constructor (size = 4, image = 'img/default.jpg') {
    this.element = document.getElementById('board');
    this.size = size;
    this.image = image;
    this.pieces = [];
    this.cue = null;
    this.start = false; // shuffle won't trigger a win
    this.moveCount = 0;
    this.shufflePieces = this.shufflePieces.bind(this);
    this.createBoard();
  }

  createBoard() {
    // Separate steps so as to not trigger animations
    this.createPieces();
    this.shufflePieces();
    this.appendPieces();
  }

  createPieces() {
    const numOfPieces = Math.pow(this.size, 2);
    for (let i = 0; i < numOfPieces; i++) {
      const piece = new Piece(this);
      // Last piece to be made is the cue
      if (i + 1 === numOfPieces) {
        piece.element.className = 'piece cue';
        this.cue = piece;
      }
      this.pieces.push(piece);
    }
  }

  shufflePieces(e) {
    let count = 0;
    let neighbors;
    let random;
    if (e) e.preventDefault();

    // Moves must be legal even while shuffling
    // otherwise the puzzle will be unsolvable
    while (count < 100) {
      neighbors = this.pieces.filter(piece => {
        return piece.pieceNeighborsCue();
      });
      random = Math.floor(Math.random() * (neighbors.length));
      neighbors[random].clickHandler();
      count++;
    }
    this.moveCount = 0;
  }

  appendPieces() {
    this.pieces.forEach(piece => {
      this.element.appendChild(piece.element);
    });
    this.start = true;
  }

  isSolved() {
    if (this.start === false) return false;

    const incorrect = this.pieces.filter(piece => {
      const id = piece.element.id.split('-');
      if (id[0] !== `${piece.x}` || id[1] !== `${piece.y}`) return true;
    });
    if (!incorrect.length) return true;
  }
}
