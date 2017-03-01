export default class Piece {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.x = Math.floor(this.puzzle.pieces.length / this.puzzle.size);
    this.y = this.puzzle.pieces.length % this.puzzle.size;
    this.element = (() => {
      const element = document.createElement('div');
      const percent = 100 / this.puzzle.size;
      const size = 600;
      element.id = `${this.x}-${this.y}`;
      element.className = 'piece';
      element.style.backgroundSize = `${size}px`;
      element.style.width = `${size / this.puzzle.size}px`;
      element.style.height = `${size / this.puzzle.size}px`;
      element.style.marginLeft = `${this.x * percent}%`;
      element.style.marginTop = `${this.y * percent}%`;
      element.style.backgroundImage = `url("${this.puzzle.image}")`;
      element.style.backgroundPosition = `${(size / this.puzzle.size) * this.x * -1}px ${(size / this.puzzle.size) * this.y * -1}px`;
      element.onclick = this.clickHandler.bind(this);
      return element;
    })();
  }

  neighborsCue() {
    const cue = this.puzzle.cue;

    if (this.x === cue.x) { // Same row, neighboring col
      if (this.y - 1 === cue.y || this.y + 1 === cue.y) return true;
    }
    else if (this.y === cue.y) { // Same col, neighboring row
      if (this.x - 1 === cue.x || this.x + 1 === cue.x) return true;
    }
    return false;
  }

  clickHandler() {
    const cue = this.puzzle.cue;

    if (this.neighborsCue()) {
      const temp = {
        x: cue.x,
        marginLeft: cue.element.style.marginLeft,
        y: cue.y,
        marginTop: cue.element.style.marginTop
      };

      cue.x = this.x;
      cue.y = this.y;
      cue.element.style.marginLeft = this.element.style.marginLeft;
      cue.element.style.marginTop = this.element.style.marginTop;

      this.x = temp.x;
      this.y = temp.y;
      this.element.style.marginLeft = temp.marginLeft;
      this.element.style.marginTop = temp.marginTop;

      this.puzzle.moveCount++;

      if (this.puzzle.isSolved()) {
        document.getElementById('header').innerHTML = `Solved in ${this.puzzle.moveCount} moves!`;
        this.puzzle.cue.element.style.filter = 'opacity(100%)';
        this.puzzle.pieces.forEach(piece => {
          piece.element.style.outline = '0px';
        });
      }
    }
  }
}
