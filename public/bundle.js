/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece = __webpack_require__(1);

var _Piece2 = _interopRequireDefault(_Piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Puzzle = function () {
  function Puzzle() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
    var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public/img/default.jpg';

    _classCallCheck(this, Puzzle);

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

  _createClass(Puzzle, [{
    key: 'createBoard',
    value: function createBoard() {
      // Separate steps so as to not trigger animations
      this.createPieces();
      this.shufflePieces();
      this.appendPieces();
    }
  }, {
    key: 'createPieces',
    value: function createPieces() {
      var numOfPieces = Math.pow(this.size, 2);
      for (var i = 0; i < numOfPieces; i++) {
        var piece = new _Piece2.default(this);
        // Last piece to be made is the cue
        if (i + 1 === numOfPieces) {
          piece.element.className = 'piece cue';
          this.cue = piece;
        }
        this.pieces.push(piece);
      }
    }
  }, {
    key: 'shufflePieces',
    value: function shufflePieces(e) {
      var count = 0;
      var neighbors = void 0;
      var random = void 0;
      if (e) e.preventDefault();

      // Moves must be legal even while shuffling
      // otherwise the puzzle will be unsolvable
      while (count < 100) {
        neighbors = this.pieces.filter(function (piece) {
          return piece.pieceNeighborsCue();
        });
        random = Math.floor(Math.random() * neighbors.length);
        neighbors[random].clickHandler();
        count++;
      }
      this.moveCount = 0;
    }
  }, {
    key: 'appendPieces',
    value: function appendPieces() {
      var _this = this;

      this.pieces.forEach(function (piece) {
        _this.element.appendChild(piece.element);
      });
      this.start = true;
    }
  }, {
    key: 'isSolved',
    value: function isSolved() {
      if (this.start === false) return false;

      var incorrect = this.pieces.filter(function (piece) {
        var id = piece.element.id.split('-');
        if (id[0] !== '' + piece.x || id[1] !== '' + piece.y) return true;
      });
      if (!incorrect.length) return true;
    }
  }]);

  return Puzzle;
}();

exports.default = Puzzle;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
  function Piece(puzzle) {
    var _this = this;

    _classCallCheck(this, Piece);

    this.puzzle = puzzle;
    this.x = Math.floor(this.puzzle.pieces.length / this.puzzle.size);
    this.y = this.puzzle.pieces.length % this.puzzle.size;
    this.element = function () {
      var element = document.createElement('div');
      var percent = 100 / _this.puzzle.size;
      var size = 600;
      element.id = _this.x + '-' + _this.y;
      element.className = 'piece';
      element.style.backgroundSize = size + 'px';
      element.style.width = size / _this.puzzle.size + 'px';
      element.style.height = size / _this.puzzle.size + 'px';
      element.style.marginLeft = _this.x * percent + '%';
      element.style.marginTop = _this.y * percent + '%';
      element.style.backgroundImage = 'url("' + _this.puzzle.image + '")';
      element.style.backgroundPosition = size / _this.puzzle.size * _this.x * -1 + 'px ' + size / _this.puzzle.size * _this.y * -1 + 'px';
      element.onclick = _this.clickHandler.bind(_this);
      return element;
    }();
  }

  _createClass(Piece, [{
    key: 'pieceNeighborsCue',
    value: function pieceNeighborsCue() {
      var cue = this.puzzle.cue;

      if (this.x === cue.x) {
        // Same row, neighboring col
        if (this.y - 1 === cue.y || this.y + 1 === cue.y) return true;
      } else if (this.y === cue.y) {
        // Same col, neighboring row
        if (this.x - 1 === cue.x || this.x + 1 === cue.x) return true;
      }
      return false;
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      var cue = this.puzzle.cue;
      var percent = 100 / this.puzzle.size;

      if (this.pieceNeighborsCue()) {
        var temp = {
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
          document.getElementById('header').innerHTML = 'Solved in ' + this.puzzle.moveCount + ' moves!';
          this.puzzle.cue.element.style.filter = 'opacity(100%)';
          this.puzzle.pieces.forEach(function (piece) {
            piece.element.style.outline = '0px';
          });
        }
      }
    }
  }]);

  return Piece;
}();

exports.default = Piece;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Puzzle = __webpack_require__(0);

var _Puzzle2 = _interopRequireDefault(_Puzzle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearBoard() {
  var board = document.getElementById('board');
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function createBoard(size) {
  clearBoard();
  var puzzle = new _Puzzle2.default(size);
  document.getElementById('shuffle').onclick = puzzle.shufflePieces;
}

function sizeChange(e) {
  e.preventDefault();
  createBoard(e.target.value);
}

window.onload = function () {
  createBoard();
  document.getElementById('size').onchange = sizeChange;
};

/***/ })
/******/ ]);