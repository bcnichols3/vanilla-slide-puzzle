import {expect} from 'chai';
import {spy} from 'sinon';
import jsdom from 'jsdom';

import Piece from '../js/Piece';

let puzzle;
let piece;
let cue;
let checkWinSpy = spy(() => {
  return false;
});
let isSolvedSpy = spy(() => {
  return false;
});

describe('Piece class', () => {
  beforeEach('create a clean DOM and new puzzle piece', () => {
    const doc = jsdom.jsdom(
      '<!doctype html><html><body><div id="board"></div></body></html>'
    );

    global.document = doc;
    global.window = doc.defaultView;

    puzzle = {
      size: 4,
      image: 'burp.jpg',
      pieces: [],
      cue: null,
      start: true,
      moveCount: 0,
      isSolved: isSolvedSpy,
      checkWin: checkWinSpy
    };
    piece = new Piece(puzzle);
    piece.neighborsCue = spy(piece.neighborsCue);
    puzzle.pieces.push(piece);

    cue = new Piece(puzzle);
    puzzle.cue = cue;
    puzzle.pieces.push(cue);
  });

  describe('Piece constructor', () => {
    it('has the expected default values', () => {
      expect(piece.puzzle).to.be.deep.equal(puzzle);
      expect(piece.x).to.be.equal(0);
      expect(piece.y).to.be.equal(0);
      expect(piece.element.id).to.be.equal('0-0');
    });
  });

  describe('Method: neighborsCue', () => {
    it('returns true if piece directly neighbors the cue', () => {
      piece.x = 1;
      piece.y = 1;
      cue.x = 0;
      cue.y = 1;
      expect(piece.neighborsCue()).to.be.true;
      cue.x = 1;
      cue.y = 0;
      expect(piece.neighborsCue()).to.be.true;
      cue.x = 1;
      cue.y = 2;
      expect(piece.neighborsCue()).to.be.true;
      cue.x = 2;
      cue.y = 1;
      expect(piece.neighborsCue()).to.be.true;
    });

    it('returns false if piece is anywhere else', () => {
      piece.x = 1;
      piece.y = 1;
      cue.x = 0;
      cue.y = 0;
      expect(piece.neighborsCue()).to.be.false;
      cue.x = 2;
      cue.y = 0;
      expect(piece.neighborsCue()).to.be.false;
      cue.x = 2;
      cue.y = 2;
      expect(piece.neighborsCue()).to.be.false;
      cue.x = 0;
      cue.y = 2;
      expect(piece.neighborsCue()).to.be.false;
      cue.x = 10;
      cue.y = 10;
      expect(piece.neighborsCue()).to.be.false;
    });
  });

  describe('Method: clickHandler', () => {
    it('checks for a valid move with "neighborsCue" Piece method', () => {
      piece.clickHandler();
      expect(piece.neighborsCue).to.be.calledTwice;
    });

    it('does nothing if the piece doesn’t neieghbor the cue', () => {
      const pieceOrigin = {
        x: 1,
        y: 1
      };

      const cueOrigin = {
        x: 0,
        y: 0
      };

      piece.x = pieceOrigin.x;
      piece.y = pieceOrigin.y;
      cue.x = cueOrigin.x;
      cue.y = cueOrigin.y;

      piece.clickHandler();

      expect(piece.x).to.be.equal(pieceOrigin.x);
      expect(piece.y).to.be.equal(pieceOrigin.y);
      expect(puzzle.moveCount).to.be.equal(0);
    });

    it('swaps the piece’s and the cue’s positions', () => {
      const pieceOrigin = {
        x: 1,
        y: 1
      };

      const cueOrigin = {
        x: 1,
        y: 0
      };

      piece.x = pieceOrigin.x;
      piece.y = pieceOrigin.y;
      cue.x = cueOrigin.x;
      cue.y = cueOrigin.y;

      piece.clickHandler();

      expect(piece.x).to.be.equal(cueOrigin.x);
      expect(piece.y).to.be.equal(cueOrigin.y);
      expect(cue.x).to.be.equal(pieceOrigin.x);
      expect(cue.y).to.be.equal(pieceOrigin.y);
    });

    it('increments the move counter', () => {
      expect(puzzle.moveCount).to.be.equal(0);
      piece.clickHandler();
      expect(puzzle.moveCount).to.be.equal(1);
      piece.clickHandler();
      expect(puzzle.moveCount).to.be.equal(2);
    });

    it('checks the puzzle with the "isSolved" Puzzle method', () => {
      piece.clickHandler();
      expect(puzzle.isSolved).to.be.calledOnce;
    });
  });

});
