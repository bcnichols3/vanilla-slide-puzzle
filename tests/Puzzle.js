import {expect} from 'chai';
import {spy} from 'sinon';
import jsdom from 'jsdom';

import Puzzle from '../js/Puzzle';
import Piece from '../js/Piece';

let puzzle;

describe('Puzzle class', () => {

  beforeEach('create a clean DOM and new Puzzle instance', () => {
    const doc = jsdom.jsdom(
      '<!doctype html><html><body><h2 id="header">Slide Puzzle</h2><div id="board"></div></body></html>'
    );

    global.document = doc;
    global.window = doc.defaultView;

    // Create a fresh puzzle
    puzzle = new Puzzle();
    spy(puzzle, 'createBoard');
    spy(puzzle, 'createPieces');
    spy(puzzle, 'shufflePieces');
    spy(puzzle, 'appendPieces');
    spy(puzzle, 'isSolved');
  });

  describe('Puzzle constructor', () => {
    it('has the expected default values', () => {
      expect(puzzle.element.id).to.be.equal('board');
      expect(puzzle.size).to.be.equal(4);
      expect(puzzle.image).to.be.equal('img/default.jpg');
      expect(puzzle.pieces).to.be.instanceof(Array);
      expect(puzzle.pieces.length).to.be.equal(16);
      expect(puzzle.cue).to.be.instanceof(Piece);
      expect(puzzle.start).to.be.false;
      expect(puzzle.moveCount).to.be.equal(0);
    });
  })

  describe('Method: createPieces', () => {
    it('can create custom puzzle sizes', () => {
      const smallPuzzle = new Puzzle(3);
      expect(smallPuzzle.pieces.length).to.be.equal(9);

      const largePuzzle = new Puzzle(5);
      expect(largePuzzle.pieces.length).to.be.equal(25);

      const jumboPuzzle = new Puzzle(6);
      expect(jumboPuzzle.pieces.length).to.be.equal(36);
    });
  });

  describe('Method: shufflePieces', () => {
    it('resets the move counter', () => {
      puzzle.moveCount = 15;
      puzzle.shufflePieces();
      expect(puzzle.moveCount).to.be.equal(0);
    });
  });

  describe('Method: appendPieces', () => {
    it('appends all pieces to the DOM', () => {
      puzzle.clearBoard();
      puzzle.appendPieces();
      const children = puzzle.element.children;
      expect(children.length).to.be.equal(puzzle.pieces.length);
    });
  });

  describe('Method: createBoard', () => {
    it('calls creates a shuffled board on the DOM', () => {
      expect(puzzle.createPieces).to.be.calledOnce;
      expect(puzzle.shufflePieces).to.be.calledOnce;
      expect(puzzle.appendPieces).to.be.calledOnce;
    });
  });

  describe('Method: isSolved', () => {
    it('returns false if play hasn’t started', () => {
      puzzle.start = false;
      puzzle.pieces = [];
      puzzle.createPieces();
      expect(puzzle.isSolved()).to.be.false;
    });

    it('returns false if pieces are out of place', () => {
      puzzle.shufflePieces();
      expect(puzzle.isSolved()).to.be.false;
    });

    it('returns true if all pieces are in place', () => {
      puzzle.pieces = [];
      puzzle.createPieces();
      puzzle.start = true;
      expect(puzzle.isSolved()).to.be.true;
    });
  });

  describe('Method: clearBoard', () => {
    it('removes all puzzle pieces from the DOM', () => {
      let children = puzzle.element.children;
      expect(children.length).to.be.truthy;
      puzzle.clearBoard();
      children = puzzle.element.children;
      expect(children.length).to.be.equal(0);
    });
  });
});
